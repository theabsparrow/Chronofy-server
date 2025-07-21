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

const getAllEvents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await eventService.getAllEvents(query);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'events are retrived successfully',
      data: result,
    });
  },
);

const getASingleEvent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await eventService.getASingleEvent(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'event is retrived successfully',
      data: result,
    });
  },
);

const updateEvent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await eventService.updateEvent(id, payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'event is updated successfully',
      data: result,
    });
  },
);

const deleteEvent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await eventService.deleteEvent(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'event is deleted successfully',
      data: result,
    });
  },
);

export const eventController = {
  createEvent,
  getAllEvents,
  getASingleEvent,
  updateEvent,
  deleteEvent,
};
