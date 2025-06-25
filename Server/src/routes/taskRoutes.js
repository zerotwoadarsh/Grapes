import express from 'express';
import {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getTasks);

router.post('/', createTask);

router.put('/:id', updateTaskStatus);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;
