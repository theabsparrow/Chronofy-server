/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utills/catchAsync';
import { eventService } from './event.service';
import { sendResponse } from '../utills/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createEvent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await eventService.createEvent(payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'event created successfully',
      data: result,
    });
  },
);

export const eventController = {
  createEvent,
};
