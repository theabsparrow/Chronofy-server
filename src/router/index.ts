import { Router } from 'express';
import validateRequest from '../middlewire/validateRequest';
import { eventValidation } from '../event/event.validation';
import { eventController } from '../event/event.controller';

const router = Router();

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
export default router;
