import { TEvent } from './event.interface';
import { v4 as uuidv4 } from 'uuid';
import { categorizeEvent } from './event.utills';
import EventModel, { events } from './event.model';
import AppError from '../error/AppError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder, { QueryBuilderForDatabase } from '../builder/QueryBuilder';
import { searchableFields } from './event.const';

// crud operation for local memory like in an array starts
const createEvent = async (payload: TEvent) => {
  const { title, date, time, notes } = payload;
  if (!title || !date || !time || !notes) {
    throw new AppError(StatusCodes.NOT_FOUND, `value not found`);
  }
  const eventCategory = categorizeEvent(
    `${payload?.title} ${payload?.notes || ''}`,
  );
  if (!eventCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, 'category did not generate');
  }
  payload.category = eventCategory;
  payload.id = uuidv4();
  payload.archived = false;
  payload.createdAt = new Date();
  payload.updatedAt = new Date();
  const { id, archived, createdAt, updatedAt, category } = payload;
  if (!id || archived === undefined || !createdAt || !updatedAt || !category) {
    throw new AppError(StatusCodes.NOT_FOUND, `value not found`);
  }
  events.push(payload);
  return events[events.length - 1];
};

const getAllEvents = async (query: Record<string, unknown>) => {
  const eventQuery = new QueryBuilder(events, query).filter().sort();
  const result = eventQuery.getResult();
  if (!result || result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'events not found');
  }
  return result;
};

const getASingleEvent = async (id: string) => {
  const event = events.find((e) => e.id === id);
  if (!event) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Event not found');
  }
  return event;
};

const updateEvent = async (id: string, payload: Partial<TEvent>) => {
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Event not found');
  }
  const existingEvent = events[index];
  const updatedEvent = {
    ...existingEvent,
    ...payload,
    updatedAt: new Date(),
  };
  if (!updatedEvent) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'faild to update event');
  }
  events[index] = updatedEvent;
  return events[index];
};

const deleteEvent = async (id: string) => {
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Event not found');
  }
  const deletedEvent = events.splice(index, 1);
  if (!deletedEvent.length) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete event');
  }
  return deletedEvent[0];
};
// crud operation for local memory like in an array ends

// crud operation in database like mongodb starts
const createEvenetInDatabase = async (payload: TEvent) => {
  const eventCategory = categorizeEvent(
    `${payload?.title} ${payload?.notes || ''}`,
  );
  if (!eventCategory) {
    throw new AppError(StatusCodes.NOT_FOUND, 'category did not generate');
  }
  payload.category = eventCategory;
  const result = await EventModel.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, `faild to create event`);
  }
  return result;
};

const getAllEventFromDatabase = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {};
  filter.archived = false;
  query = { ...query, ...filter };
  const eventQuery = new QueryBuilderForDatabase(EventModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort();

  const result = await eventQuery.modelQuery;
  // const meta = await eventQuery.countTotal();
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'event not found');
  }
  return result;
};

const getAllArchivedEvents = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {};
  filter.archived = true;
  query = { ...query, ...filter };
  const eventQuery = new QueryBuilderForDatabase(EventModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort();

  const result = await eventQuery.modelQuery;
  // const meta = await eventQuery.countTotal();
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'event not found');
  }
  return result;
};

const getASingleEventFromDatabase = async (id: string) => {
  const result = await EventModel.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Event not found');
  }
  return result;
};

const updateEventFromdatabase = async (
  id: string,
  payload: Partial<TEvent>,
) => {
  const isEventExists = await EventModel.findById(id);
  if (!isEventExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Event not found');
  }
  const result = await EventModel.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update event');
  }
  return result;
};

const deleteEventFromdatabase = async (id: string) => {
  const isEventExists = await EventModel.findById(id);
  if (!isEventExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Event not found');
  }
  const result = await EventModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete event');
  }
  return null;
};
// crud operation in database like mongodb ends

export const eventService = {
  createEvent,
  getAllEvents,
  getASingleEvent,
  updateEvent,
  deleteEvent,
  createEvenetInDatabase,
  getAllEventFromDatabase,
  getASingleEventFromDatabase,
  updateEventFromdatabase,
  deleteEventFromdatabase,
  getAllArchivedEvents,
};
