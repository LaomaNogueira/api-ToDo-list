import { TaskModel } from '../../../domain/models';
import { TaskRepository } from '../../../infra/typeorm/domain/repositories/taskRepository';
import {
  CreateTaskDTO,
  UpdateTaskDTO,
} from './taskServiceProtocols';
import { EnumServiceError } from '../enumServiceError';
import { TaskPaginated } from '../../../infra/typeorm/domain/repositories';
import Joi from 'joi';
import { validateSchema } from '../../helpers/validateSchema';

class TaskService {

  static async create(
    taskDTO: CreateTaskDTO,
  ): Promise<TaskModel> {
    const taskSchema = Joi.object({
      title: Joi.string().required(),
      endDate: Joi.required(),
      category: Joi.string().required(),
      done: Joi.boolean(),
      userId: Joi.string().required().guid({
        version: ['uuidv4']
      })
    });

    validateSchema(taskSchema, taskDTO);
    
    const createdTask = await TaskRepository
      .create({
        ...taskDTO,
      }).catch(() => {
        throw new Error(EnumServiceError.NOT_CREATED);
      });

    return createdTask;
  }

  static async findAll(perPage: number, page?: number): Promise<TaskPaginated> {

    const task = await TaskRepository
      .findAll(perPage, page)
      .catch(() => {
        throw new Error(EnumServiceError.NOT_FOUND);
      });

    return task;
  }

  static async findById(taskId: string): Promise<TaskModel> {
    const taskFound = await TaskRepository
      .findById(taskId)
      .catch(() => {
        throw new Error(EnumServiceError.NOT_FOUND);
      });

    if (!taskFound) {
      throw new Error(EnumServiceError.NOT_FOUND);
    }

    return taskFound;
  }

  // static async updateById(
  //   updateTaskDTO: UpdateTaskDTO
  // ): Promise<TaskModel> {
  //   const { id, hospitalId } = updateTaskDTO;

  //   delete updateTaskDTO.id;
  //   delete updateTaskDTO.hospitalId;

  //   const taskSchema = Joi.object({
  //     fullname: Joi.string(),
  //     phoneNumber: Joi.string().regex(/^\d{10,11}$/)
  //   });

  // static async deleteById(taskId: string, hospitalId: string): Promise<TaskModel> {
  //   const taskToDelete = await this.findById(taskId, hospitalId);

  //   await TaskRepository
  //     .deleteById(taskId)
  //     .catch(() => {
  //       throw new Error(EnumServiceError.NOT_DELETED);
  //     });

  //   return taskToDelete;
  // }
}

export { TaskService };
