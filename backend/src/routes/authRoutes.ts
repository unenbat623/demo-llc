import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/login', authController.login);
router.put('/profile', authController.updateProfile);

export default router;
