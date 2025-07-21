import { Router } from 'express';
import validateRequest from '../middlewire/validateRequest';
import { eventValidation } from '../event/event.validation';
import { eventController } from '../event/event.controller';

const router = Router();

// routes for local device memory starts
router.post(
  '/event',
  validateRequest(eventValidation.eventValidationSchema),
  eventController.createEvent,
);
router.get('/events', eventController.getAllEvents);
router.get('/event/:id', eventController.getASingleEvent);
router.put(
  '/event/:id',
  validateRequest(eventValidation.updateEventValidationSchema),
  eventController.updateEvent,
);
router.delete('/event/:id', eventController.deleteEvent);
// routes for local device memory ends

// routes for database like mongodb starts
router.post(
  '/create-event',
  validateRequest(eventValidation.eventValidationSchema),
  eventController.createEventIndatabase,
);
router.get('/get-events', eventController.getAllEventsFromDataabase);
router.get('/get-archived', eventController.getAllArchivedEvents);
router.get('/get-event/:id', eventController.getASingleEventFromDatabase);
router.put(
  '/update-event/:id',
  validateRequest(eventValidation.updateEventValidationSchema),
  eventController.updateEventFromdatabase,
);
router.delete('/delete-event/:id', eventController.deleteEventFromDatabase);
// routes for database like mongodb ends
export default router;
