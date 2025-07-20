import { ZodObject, ZodRawShape } from 'zod';
import { catchAsync } from '../utills/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: ZodObject<ZodRawShape>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      ...req.body,
    };
    await schema.parseAsync(data);
    next();
  });
};
export default validateRequest;
