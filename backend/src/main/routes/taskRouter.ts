import { Router } from 'express';
import { TaskController } from '../../presentation/controllers/TaskController';

const taskRouter = Router();

taskRouter.route('/')
  .post(TaskController.create)

export { taskRouter };
