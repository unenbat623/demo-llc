import { Router } from 'express';
import * as logController from '../controllers/logController';

const router = Router();

router.get('/', logController.getLogs);
router.post('/', logController.createLog);
router.delete('/', logController.clearLogs);
router.delete('/:id', logController.deleteLog);

export default router;
