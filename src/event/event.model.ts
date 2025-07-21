import { model, Schema } from 'mongoose';
import { TEvent } from './event.interface';
import { categoryOptions } from './event.const';

export const events: TEvent[] = [];

const eventSchema = new Schema<TEvent>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      min: [1, 'title can`t be blank'],
      max: [50, 'title can`t be more than 50 character'],
    },
    date: {
      type: String,
      required: [true, ' date is required'],
    },
    time: {
      type: String,
      required: [true, 'time is required'],
    },
    notes: {
      type: String,
      min: [10, 'notes can`t be less than 10 character'],
      max: [500, ' notes can`t be more than 500 character'],
    },
    archived: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: categoryOptions,
      required: [true, 'category is required'],
    },
  },
  {
    timestamps: true,
  },
);

const EventModel = model<TEvent>('Event', eventSchema);

export default EventModel;
