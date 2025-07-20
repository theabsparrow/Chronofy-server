import z from 'zod';

const eventValidationSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'Title is required'
          : 'title is not a string',
    })
    .min(1, { error: 'title can`t be blank' })
    .max(50, { error: 'title can`t be more than 50 character' }),
  date: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Date is required' : 'date is not a string',
    })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: 'Date must be in YYYY-MM-DD format',
    })
    .refine(
      (val) => {
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
      },
      {
        message: 'past date can`t be taken',
      },
    )
    .refine(
      (val) => {
        const date = new Date(val);
        const today = new Date();
        const oneYearFromToday = new Date();
        oneYearFromToday.setFullYear(today.getFullYear() + 1);
        oneYearFromToday.setHours(0, 0, 0, 0);
        return date <= oneYearFromToday;
      },
      {
        message: 'you can fix schedule for max one year',
      },
    ),
  time: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'time is required' : 'time is not a string',
    })
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: 'Time must be in HH:MM 24-hour format',
    }),
  notes: z
    .string()
    .min(10, { error: 'notes can`t be less than 10 character' })
    .max(500, { error: 'notes can`t be more than 500 character' })
    .optional(),
});

export const eventValidation = {
  eventValidationSchema,
};
