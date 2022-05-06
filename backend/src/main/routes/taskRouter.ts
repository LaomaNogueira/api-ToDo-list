import { Router } from 'express';
import { TaskController } from '../../presentation/controllers/TaskController';

const taskRouter = Router();

taskRouter.route('/')
  .post(TaskController.create)
  .get(TaskController.findAll);

taskRouter.route('/:taskId')
  .get(TaskController.findById)
//   .put(TaskController.updateById)
//   .delete(TaskController.deleteById);

export { taskRouter };
