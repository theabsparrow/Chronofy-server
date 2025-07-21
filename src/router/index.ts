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
export default router;
