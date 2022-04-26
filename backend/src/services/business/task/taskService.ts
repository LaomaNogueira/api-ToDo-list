import { TaskModel } from '../../../domain/models';
import {
  TaskRepository
} from '../../../infra/typeorm/domain/repositories/taskRepository';
import {
  CreateTaskDTO,
  UpdateTaskDTO,
} from './taskServiceProtocols';
import { EnumServiceError } from './enumServiceError';
//import { TaskPaginator } from '../../../infra/typeorm/domain/repositories';
import Joi from 'joi';
import { validateSchema } from '../../helpers/validateSchema';

class TaskService {

  static async create(
    taskDTO: CreateTaskDTO,
  ): Promise<TaskModel> {
    console.log('service 1')
    // const taskSchema = Joi.object({
    //   title: Joi.string().required(),
    //   endDate: Joi.required(),
    //   category: Joi.string().required(),
    //   done: Joi.boolean(),
    //   userId: Joi.string().required().guid({
    //     version: ['uuidv4']
    //   })
    // });

    // validateSchema(taskSchema, taskDTO);
    console.log('service 2')
    const createdTask = await TaskRepository
      .create({
        ...taskDTO,
      }).catch(() => {
        throw new Error(EnumServiceError.NOT_CREATED);
      });

    return createdTask;
  }

  // static async findById(healthcareProfessionalId: string, hospitalId: string): Promise<TaskModel> {
  //   const healthcareProfessionalFound = await TaskRepository
  //     .findById(healthcareProfessionalId, hospitalId)
  //     .catch(() => {
  //       throw new Error(EnumServiceError.NOT_FOUND);
  //     });

  //   if (!healthcareProfessionalFound) {
  //     throw new Error(EnumServiceError.NOT_FOUND);
  //   }

  //   return healthcareProfessionalFound;
  // }

  // static async findAllByHospitalId(hospitalId: string, page?: number): Promise<TaskPaginator> {
  //   const healthcareProfessional = await TaskRepository
  //     .findAllByHospitalId(hospitalId, page)
  //     .catch(() => {
  //       throw new Error(EnumServiceError.NOT_FOUND);
  //     });

  //   return healthcareProfessional;
  // }

  // static async updateById(
  //   updateTaskDTO: UpdateTaskDTO
  // ): Promise<TaskModel> {
  //   const { id, hospitalId } = updateTaskDTO;

  //   delete updateTaskDTO.id;
  //   delete updateTaskDTO.hospitalId;

  //   const healthcareProfessionalSchema = Joi.object({
  //     fullname: Joi.string(),
  //     phoneNumber: Joi.string().regex(/^\d{10,11}$/)
  //   });

  //   validateSchema(healthcareProfessionalSchema, updateTaskDTO);

  //   await this.findById(id, hospitalId);
  //   const updatedTask = await TaskRepository
  //     .updateById(id, {
  //       ...updateTaskDTO,
  //     }).catch(() => {
  //       throw new Error(EnumServiceError.NOT_UPDATED);
  //     });

  //   return updatedTask;
  // }

  // static async deleteById(healthcareProfessionalId: string, hospitalId: string): Promise<TaskModel> {
  //   const healthcareProfessionalToDelete = await this.findById(healthcareProfessionalId, hospitalId);

  //   await TaskRepository
  //     .deleteById(healthcareProfessionalId)
  //     .catch(() => {
  //       throw new Error(EnumServiceError.NOT_DELETED);
  //     });

  //   return healthcareProfessionalToDelete;
  // }
}

export { TaskService };
