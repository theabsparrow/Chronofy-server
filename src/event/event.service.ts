import { TEvent } from './event.interface';

const createEvent = async (payload: TEvent) => {
  console.log(payload);
};

export const eventService = {
  createEvent,
};
