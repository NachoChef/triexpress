import { NextFunction, Request, Response, Router } from 'express';

export const searchRouter = Router();

/* GET page. */
searchRouter.get(
  '/',
  function (req: Request, res: Response, next: NextFunction) {
    res.sendStatus(200);
  }
);
