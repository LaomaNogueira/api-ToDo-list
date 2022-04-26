import { Request, Response } from 'express';
import { UserService } from '../../services/business/user';
import { StatusError } from '../errors/statusError';
import { verifyObrigatoryFields } from '../helpers/verifyRequiredFields';
import { StatusErrorHandler } from '../helpers/StatusErrorHandler';

function errorHandlerFactory(error: any, method: string) {
  const newError = new Error(`Erro em 'UserController' no método: '${method}'`);
  StatusErrorHandler.handle(newError, error);
}

class UserController {

  // static async create(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const hospitalId = request.headers['hospitalid'] as string;
  //     const body = request.body;

  //     verifyObrigatoryFields(['fullname', 'phoneNumber'], body);

  //     const healthcareProfessionalCreated = await UserService.create({
  //       ...body,
  //       hospitalId: hospitalId
  //     }).catch((error) => {
  //       throw new StatusError(400, error);
  //     });

  //     return response.status(200).send(healthcareProfessionalCreated);
  //   } catch (error: any) {
  //     errorHandlerFactory(error, 'create');
  //     return response.status(error.status).send(error);
  //   }
  // }

  static async findById(request: Request, response: Response): Promise<any> {
    try {
      // const hospitalId = request.headers['hospitalid'] as string;
      // const { healthcareProfessionalId } = request.params;

      // const healthcareProfessional = await UserService
      //   .findById(healthcareProfessionalId, hospitalId)
      //   .catch((error) => {
      //     throw new StatusError(400, error);
      //   });

      // return response.status(200).send(healthcareProfessional);
      console.log('entrou na controller')
      return 'Oi, entrei';
    } catch (error: any) {
      errorHandlerFactory(error, 'findById');
      // return response.status(error.status).send(error);
    }
  }

  // static async findAllByHospitalId(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const hospitalId = request.headers['hospitalid'] as string;
  //     const { page } = request.query;

  //     const healthcareProfessional = await UserService
  //       .findAllByHospitalId(hospitalId, Number(page))
  //       .catch((error) => {
  //         throw new StatusError(400, error);
  //       });

  //     return response.status(200).send(healthcareProfessional);
  //   } catch (error: any) {
  //     errorHandlerFactory(error, 'findAllByHospitalId');
  //     return response.status(error.status).send(error);
  //   }
  // }

  // static async updateById(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const hospitalId = request.headers['hospitalid'] as string;
  //     const { healthcareProfessionalId } = request.params;
  //     const body = request.body;

  //     const healthcareProfessionalUpdated = await UserService
  //       .updateById({
  //         ...body,
  //         id: healthcareProfessionalId,
  //         hospitalId: hospitalId
  //       }).catch((error) => {
  //         throw new StatusError(400, error);
  //       });

  //     return response.status(200).send(healthcareProfessionalUpdated);
  //   } catch (error: any) {
  //     errorHandlerFactory(error, 'updateById');
  //     return response.status(error.status).send(error);
  //   }
  // }

  // static async deleteById(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const hospitalId = request.headers['hospitalid'] as string;
  //     const { healthcareProfessionalId } = request.params;

  //     const deletedUserId = await UserService
  //       .deleteById(healthcareProfessionalId, hospitalId)
  //       .catch((error) => {
  //         throw new StatusError(400, error);
  //       });

  //     return response.status(200).send({ message: 'deleted', healthcareProfessional: deletedUserId });
  //   } catch (error: any) {
  //     errorHandlerFactory(error, 'deleteById');
  //     return response.status(error.status).send(error);
  //   }
  // }
}

export { UserController };
