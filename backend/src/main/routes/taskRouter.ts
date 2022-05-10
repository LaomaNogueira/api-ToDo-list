import { Router } from 'express';
import { TaskController } from '../../presentation/controllers/TaskController';

const taskRouter = Router();

taskRouter.route('/')
  .post(TaskController.create)
  .get(TaskController.findAllWithFilters);

taskRouter.route('/:taskId')
  .get(TaskController.findById)
  .put(TaskController.updateById)
  .delete(TaskController.deleteById)
  .patch(TaskController.updateToDone);

taskRouter.route('/user/:userId')
  .get(TaskController.findAllByUserId)

export { taskRouter };
