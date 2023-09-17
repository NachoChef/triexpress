import { Express, NextFunction, Request, Response } from 'express';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { searchRouter } from './routes/search';
import Logger from './lib/logger';
import morganMiddleware from './config/morgan';

const app: Express = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morganMiddleware);

app.use('/search', searchRouter);

app.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('Hello World!');
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  Logger.debug(`⚡️[server]: Server is running at http://localhost:3000`);
});
