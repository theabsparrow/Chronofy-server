/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utills/catchAsync';
import { eventService } from './event.service';
import { sendResponse } from '../utills/sendResponse';
import { StatusCodes } from 'http-status-codes';

// crud operation for local memory like in an array starts
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
// crud operation for local memory like in an array ends

// crud operation in database like mongodb starts
const createEventIndatabase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await eventService.createEvenetInDatabase(payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'event created successfully',
      data: result,
    });
  },
);

const getAllEventsFromDataabase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await eventService.getAllEventFromDatabase(query);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'events are retrived successfully',
      data: result,
    });
  },
);

const getASingleEventFromDatabase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await eventService.getASingleEventFromDatabase(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'event is retrived successfully',
      data: result,
    });
  },
);

const updateEventFromdatabase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await eventService.updateEventFromdatabase(id, payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'event is updated successfully',
      data: result,
    });
  },
);

const deleteEventFromDatabase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await eventService.deleteEventFromdatabase(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'event is deleted successfully',
      data: result,
    });
  },
);
// crud operation in database like mongodb ends

export const eventController = {
  createEvent,
  getAllEvents,
  getASingleEvent,
  updateEvent,
  deleteEvent,
  createEventIndatabase,
  getAllEventsFromDataabase,
  getASingleEventFromDatabase,
  updateEventFromdatabase,
  deleteEventFromDatabase,
};
