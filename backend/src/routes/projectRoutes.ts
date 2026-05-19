import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject
} from '../controllers/projectController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);

// Protected routes (Admin only)
router.post('/', authenticateAdmin, createProject);
router.patch('/:id', authenticateAdmin, updateProject);
router.delete('/:id', authenticateAdmin, deleteProject);

export default router;
