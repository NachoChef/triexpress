"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const search_1 = require("./src/routes/search");
const logger_1 = __importDefault(require("./src/lib/logger"));
const morgan_1 = __importDefault(require("./src/config/morgan"));
const app = (0, express_1.default)();
// app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(morgan_1.default);
app.use('/search', search_1.searchRouter);
app.get('/', function (req, res, next) {
    res.send('Hello World!');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(3000, () => {
    logger_1.default.debug(`⚡️[server]: Server is running at http://localhost:3000`);
});
