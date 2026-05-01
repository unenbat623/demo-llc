import { Router } from 'express';
import * as teamController from '../controllers/teamController';

const router = Router();

router.get('/', teamController.getTeam);
router.post('/', teamController.createMember);
router.put('/:id', teamController.updateMember);
router.delete('/:id', teamController.deleteMember);
router.post('/bulk-delete', teamController.bulkDeleteMembers);
router.post('/bulk-import', teamController.bulkImportMembers);

export default router;