import { TEvent } from './event.interface';
import { v4 as uuidv4 } from 'uuid';

const createEvent = async (payload: TEvent) => {
  payload.id = uuidv4();
  payload.category = 'Work';
  payload.archived = false;
  payload.createdAt = new Date();
  payload.updatedAt = new Date();
  return payload;
};

export const eventService = {
  createEvent,
};
