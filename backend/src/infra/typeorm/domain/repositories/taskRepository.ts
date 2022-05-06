import { Task } from '../entities';
import { getConnection } from 'typeorm';
import { TaskPaginated, nextPage } from '.';

class TaskRepository {

  static async create(
    taskDTO: Partial<Omit<Task, 'id'>>
  ): Promise<Task> {
    const connection = getConnection();
    const result = await connection.getRepository(Task).save(taskDTO);
    return result;
  }

  static async findAll(perPage: number, page?: number): Promise<TaskPaginated> {
    const skip = nextPage(perPage, page)
    const connection = getConnection();
    const result = await connection.getRepository(Task).findAndCount({
        skip: skip,
        take: perPage
    });

    const parsedResult = { tasks: result[0], total: result[1] };

    return parsedResult;
  }

  static async findById(taskId: string): Promise<Task> {
    const connection = getConnection();
    const result = await connection.getRepository(Task).findOne({
        where: { id: taskId }
    });
    
    return result;
}

  // static async updateById(
  //   taskId: string, 
  //   attributes: Partial<Omit<Task, 'id' | 'hospitalId'>>
  // ): Promise<Task> {

  //   const connection = await TypeOrmHelper.getDomainConnection();
  //   const result = await connection.getRepository(Task).update(
  //     { id: taskId }, 
  //     { ...attributes }
  //   ).then(async () => {
  //     return connection.getRepository(Task).findOne({ id: taskId });
  //   });
    
  //   return result;
  // }

  // static async deleteById(taskId: string): Promise<void> {
  //   const connection = await TypeOrmHelper.getDomainConnection();
  //   await connection.getRepository(Task).delete({ id: taskId });
  // }
}

export { TaskRepository };
