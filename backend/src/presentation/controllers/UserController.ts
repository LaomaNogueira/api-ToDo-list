import { Request, Response } from 'express';
import { UserService } from '../../services/business/user';
import { StatusError } from '../errors/statusError';
import { verifyRequiredFields } from '../helpers';
import { StatusErrorHandler } from '../helpers/StatusErrorHandler';

function errorHandlerFactory(error: any, method: string) {
  const newError = new Error(`Erro em 'UserController' no método: '${method}'`);
  StatusErrorHandler.handle(newError, error);
}

class UserController {

  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const body = request.body;

      verifyRequiredFields(['name', 'email', 'password'], body);

      const userCreated = await UserService.create({ ...body }).catch((error) => {
        throw new StatusError(400, error);
      });

      return response.status(200).send(userCreated);
    } catch (error: any) {
      errorHandlerFactory(error, 'create');
      return response.status(error.status).send(error);
    }
  }

  static async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const { perPage, page } = request.query;
      const users = await UserService
        .findAll(Number(perPage), Number(page))
        .catch((error: any) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send(users);
    } catch (error: any) {
      errorHandlerFactory(error, 'findAll');
      return response.status(error.status).send(error);
    }
  }

  static async findById(request: Request, response: Response): Promise<any> {
    try {
      const { userId } = request.params;

      const user = await UserService
        .findById(userId)
        .catch((error) => {
          throw new StatusError(400, error);
        });

      return response.status(200).send(user);

    } catch (error: any) {
      errorHandlerFactory(error, 'findById');
      return response.status(error.status).send(error);
    }
  }

  // static async updateById(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const hospitalId = request.headers['hospitalid'] as string;
  //     const { userId } = request.params;
  //     const body = request.body;

  //     const userUpdated = await UserService
  //       .updateById({
  //         ...body,
  //         id: userId,
  //         hospitalId: hospitalId
  //       }).catch((error) => {
  //         throw new StatusError(400, error);
  //       });

  //     return response.status(200).send(userUpdated);
  //   } catch (error: any) {
  //     errorHandlerFactory(error, 'updateById');
  //     return response.status(error.status).send(error);
  //   }
  // }

  // static async deleteById(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const hospitalId = request.headers['hospitalid'] as string;
  //     const { userId } = request.params;

  //     const deletedUserId = await UserService
  //       .deleteById(userId, hospitalId)
  //       .catch((error) => {
  //         throw new StatusError(400, error);
  //       });

  //     return response.status(200).send({ message: 'deleted', user: deletedUserId });
  //   } catch (error: any) {
  //     errorHandlerFactory(error, 'deleteById');
  //     return response.status(error.status).send(error);
  //   }
  // }
}

export { UserController };
