import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick';
import Joi from 'joi';
import { ZodSchema } from 'zod';

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const obj = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(obj);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;

export function zodValidate<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req);
      if (!result.success) {
        // handle error then return
        return next(new ApiError(httpStatus.BAD_REQUEST, result.error.toString()));
      } else {
        // do something
        Object.assign(req, result.data);
        return next();
      }
    } catch (e) {
      return next(new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Something went wrong'));
    }
  };
}
