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
import { TaskFilter } from './';

class TaskService {

  private static validateDateFilter(startDate: string, endDate: string): void | Error {
    if (startDate || endDate) {
      if (!startDate || !endDate) {
        throw new Error(EnumServiceError.INVALID_PERIOD);
      }

      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      if (parsedEndDate < parsedStartDate) {
        throw new Error(EnumServiceError.INVALID_PERIOD);
      }
    }
  }

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

    if(new Date(taskDTO.endDate) < new Date()) {
      throw new Error(EnumServiceError.INVALID_DATE);
    }
    
    const createdTask = await TaskRepository
      .create({
        ...taskDTO,
      }).catch(() => {
        throw new Error(EnumServiceError.NOT_CREATED);
      });

    return createdTask;
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

  static async findAllByUserId(userId: string, perPage: number, page?: number): Promise<TaskPaginated> {
    const tasksFound = await TaskRepository
      .findAllByUserId(userId, perPage, page)
      .catch(() => {
        throw new Error(EnumServiceError.NOT_FOUND);
      });

    if (!tasksFound) {
      throw new Error(EnumServiceError.NOT_FOUND);
    }

    return tasksFound;
  }

  static async updateById(updateTaskDTO: UpdateTaskDTO): Promise<TaskModel> {
    const { id } = updateTaskDTO;
    delete updateTaskDTO.id;
    delete updateTaskDTO.userId;

    await this.findById(id);
    const updatedTask = await TaskRepository.updateById(id, { ...updateTaskDTO })
      .catch(() => {
        throw new Error(EnumServiceError.NOT_UPDATED);
      });

    return updatedTask;
  }

  static async deleteById(taskId: string): Promise<TaskModel> {
    const taskToDelete = await this.findById(taskId);

    await TaskRepository.deleteById(taskId).catch(() => {
      throw new Error(EnumServiceError.NOT_DELETED);
    });

    return taskToDelete;
  }
  
  static async findAllWithFilters(filter: TaskFilter): Promise<TaskPaginated> {

    this.validateDateFilter(filter.startTaskDate, filter.endTaskDate);
    
    const filteredTasks = await TaskRepository.findAllWithFilters(filter)
      .catch(() => {
        throw new Error(EnumServiceError.NOT_FOUND);
      });

    return filteredTasks;
  }

}

export { TaskService };
