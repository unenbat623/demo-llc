import { Router } from 'express';
import * as clientController from '../controllers/clientController';

const router = Router();

router.get('/:userId', clientController.getClientSite);
router.put('/:userId/settings', clientController.updateClientSettings);
router.get('/:userId/team', clientController.getClientTeam);
router.post('/:userId/team', clientController.addClientTeamMember);
router.put('/:userId/team/:memberId', clientController.updateClientTeamMember);
router.delete('/:userId/team/:memberId', clientController.deleteClientTeamMember);
router.post('/:userId/team/bulk-delete', clientController.bulkDeleteClientTeamMembers);
router.post('/:userId/team/bulk-import', clientController.bulkImportClientTeamMembers);

export default router;
