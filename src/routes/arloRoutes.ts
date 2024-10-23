import { Router } from 'express';
import arloController from '../controllers/arloController';

const router = Router(); // Now using named import

router.post('/', arloController.processWebhook);

export default router;
