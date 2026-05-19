import { Router } from 'express';
import { loginAdmin, logoutAdmin, getAdminProfile } from '../controllers/authController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', authenticateAdmin, logoutAdmin);
router.get('/me', authenticateAdmin, getAdminProfile);

export default router;
