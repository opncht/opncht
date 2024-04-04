import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export interface CustomParamsDictionary {
  [key: string]: any;
}

function catchAsync<T>(
  fn: RequestHandler<CustomParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
) {
  return (
    req: Request<CustomParamsDictionary, any, any, any, Record<string, any>> & T,
    res: Response<any, Record<string, any>, number>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}

export default catchAsync;
