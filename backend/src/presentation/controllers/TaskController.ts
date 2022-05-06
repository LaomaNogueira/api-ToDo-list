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

      return response.status(200).send(taskCreated);
    } catch (error: any) {
      errorHandlerFactory(error, 'create');
      return response.status(error.status).send(error);
    }
  }

  static async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const { perPage, page } = request.query;

      const tasks = await TaskService
        .findAll(Number(perPage), Number(page))
        .catch((error: any) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send(tasks);
    } catch (error: any) {
      errorHandlerFactory(error, 'findAll');
      return response.status(error.status).send(error);
    }
  }

  static async findById(request: Request, response: Response): Promise<any> {
    try {
      const { taskId } = request.params;

      const task = await TaskService
        .findById(taskId)
        .catch((error) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send(task);

    } catch (error: any) {
      errorHandlerFactory(error, 'findById');
      return response.status(error.status).send(error);
    }
  }

  // static async buildReport(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const hospitalId = request.headers['hospitalid'] as string;
  //     const { query } = request;

      // const notificationNews = await NotificationNewsService
      //   .buildReport(hospitalId, query)
      //   .catch((error) => {
      //     throw new StatusError(400, error);
      //   });

      // return response.status(200).send(notificationNews);

  //   } catch(error: any) {
  //     errorHandlerFactory(error, 'buildReport');
  //     return response.status(error.status).send(error);
  //   }
  // }
}

export { TaskController };
