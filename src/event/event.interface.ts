export type TCategory =
  | 'Work'
  | 'Personal'
  | 'Health'
  | 'Finance'
  | 'Social'
  | 'Study'
  | 'Travel'
  | 'Other';

export type TEvent = {
  id?: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  archived: boolean;
  category: TCategory;
  createdAt?: Date;
  updatedAt?: Date;
};
