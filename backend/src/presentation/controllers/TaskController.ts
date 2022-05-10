import { Request, Response } from 'express';
import { TaskService } from '../../services/business/task';
import { StatusError } from '../errors/statusError';
import { StatusErrorHandler } from '../helpers';
import { verifyRequiredFields } from '../helpers/verifyRequiredFields';

function errorHandlerFactory(error: any, method: string) {
    const newError = new Error(`Erro em 'TaskController' no método: '${method}'`);
    StatusErrorHandler.handle(newError, error);
  }

class TaskController {

  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;
    
      verifyRequiredFields(['title', 'endDate', 'category', 'userId'], body);
      
      const taskCreated = await TaskService.create({ ...body })
      .catch((error) => {
        throw new StatusError(400, error);
      });

      return response.status(201).send(taskCreated);
    } catch (error: any) {
      errorHandlerFactory(error, 'create');
      return response.status(error.status).send(error);
    }
  }

  static async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { taskId } = request.params;

      const task = await TaskService
        .findById(taskId)
        .catch((error) => {
          throw new StatusError(404, error);
        });

      return response.status(200).send(task);

    } catch (error: any) {
      errorHandlerFactory(error, 'findById');
      return response.status(error.status).send(error);
    }
  }

  static async findAllByUserId(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request.params;
      const { perPage, page } = request.query;

      const tasks = await TaskService.findAllByUserId(userId, Number(perPage), Number(page))
        .catch((error) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send(tasks);

    } catch (error: any) {
      errorHandlerFactory(error, 'findAllByUserId');
      return response.status(error.status).send(error);
    }
  }

  static async updateById(request: Request, response: Response): Promise<Response> {
    try {
      const { taskId } = request.params;
      const body = request.body;

      const taskUpdated = await TaskService.updateById({ ...body, id: taskId })
        .catch((error) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send(taskUpdated);
    } catch (error: any) {
      errorHandlerFactory(error, 'updateById');
      return response.status(error.status).send(error);
    }
  }

  static async deleteById(request: Request, response: Response): Promise<Response> {
    try {
      const { taskId } = request.params;

      const deletedTaskId = await TaskService.deleteById(taskId)
        .catch((error) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send({ message: 'deleted', user: deletedTaskId });
    } catch (error: any) {
      errorHandlerFactory(error, 'deleteById');
      return response.status(error.status).send(error);
    }
  }

  static async updateToDone(request: Request, response: Response): Promise<Response> {
    try {
      const { taskId } = request.params;

      const taskUpdated = await TaskService.updateById({ id: taskId, done: true })
        .catch((error) => {
          throw new StatusError(400, error);
        });
      
      return response.status(200).send(taskUpdated);
    } catch (error: any) {
      errorHandlerFactory(error, 'updateToDone');
      return response.status(error.status).send(error);
    }
  }

  static async findAllWithFilters(request: Request, response: Response): Promise<Response> {
    try {
      const { query } = request;          

      const tasksFiltered = await TaskService.findAllWithFilters(query)
        .catch((error) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send(tasksFiltered);
      
    } catch(error: any) {
      errorHandlerFactory(error, 'findAllWithFilters');
      return response.status(error.status).send(error);
    }
}
}

export { TaskController };
