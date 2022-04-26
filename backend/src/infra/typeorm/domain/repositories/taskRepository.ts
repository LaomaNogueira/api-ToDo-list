import { Task } from '../entities';
import { TypeORM } from '../../typeORMConfig';
import { TaskPaginator } from './taskRepositoryProtocols';

class TaskRepository {

  static async create(
    taskDTO: Partial<Omit<Task, 'id'>>
  ): Promise<Task> {
    console.log('REPOSITORY');
    const connection = await TypeORM.getDomainConnection();
    console.log(connection);
    const result = await connection.getRepository(Task).save(taskDTO);
    return result;
  }

  // static async findById(taskId: string, hospitalId: string): Promise<Task> {
  //   const connection = await TypeORM.getDomainConnection();
  //   const result = await connection.getRepository(Task).findOne({
  //     where: {
  //       id: taskId,
  //       hospitalId: hospitalId
  //     }
  //   });
  //   return result;
  // }

  // static async findAllByHospitalId(hospitalId: string, page?: number): Promise<TaskPaginator> {
  //   const maxPerPage = 25;
  //   const skip = page ? maxPerPage * page : 0;

  //   const connection = await TypeORM.getDomainConnection();
  //   const result = await connection.getRepository(Task).findAndCount({
  //     where: { hospitalId: hospitalId },
  //     skip: skip,
  //     take: maxPerPage
  //   });

  //   const parsedResult = { tasks: result[0], total: result[1] };

  //   return parsedResult;
  // }

  // static async updateById(
  //   taskId: string, 
  //   attributes: Partial<Omit<Task, 'id' | 'hospitalId'>>
  // ): Promise<Task> {

  //   const connection = await TypeORM.getDomainConnection();
  //   const result = await connection.getRepository(Task).update(
  //     { id: taskId }, 
  //     { ...attributes }
  //   ).then(async () => {
  //     return connection.getRepository(Task).findOne({ id: taskId });
  //   });
    
  //   return result;
  // }

  // static async deleteById(taskId: string): Promise<void> {
  //   const connection = await TypeORM.getDomainConnection();
  //   await connection.getRepository(Task).delete({ id: taskId });
  // }
}

export { TaskRepository };
