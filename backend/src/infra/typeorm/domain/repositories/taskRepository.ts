import { Task } from '../entities';
import { getConnection } from 'typeorm';
import { TaskPaginated, nextPage } from '.';
import { TaskFilter } from '../../../../services/business/task'

class TaskRepository {

  static async create(
    taskDTO: Partial<Omit<Task, 'id'>>
  ): Promise<Task> {
    const connection = getConnection();
    const result = await connection.getRepository(Task).save(taskDTO);
    return result;
  }

  static async findById(taskId: string): Promise<Task> {
    const connection = getConnection();
    const result = await connection.getRepository(Task).findOne({
        where: { id: taskId }
    });
    
    return result;
  }

  static async findAllByUserId(userId: string, perPage: number, page?: number): Promise<TaskPaginated> {
    const skip = nextPage(perPage, page)
    const connection = getConnection();
    const result = await connection.getRepository(Task).findAndCount({
      where: { userId: userId },
      order: {
        title: "ASC"
      },
      skip: skip,
      take: perPage
    });

    const parsedResult = { tasks: result[0], total: result[1] };

    return parsedResult;
  }

  static async updateById(
    taskId: string, 
    attributes: Partial<Omit<Task, 'id' >>
  ): Promise<Task> {

    const connection = getConnection();
    const result = await connection.getRepository(Task).update(
      { id: taskId }, 
      { ...attributes }
    ).then(async () => {
      return connection.getRepository(Task).findOne({ id: taskId });
    });
    
    return result;
  }

  static async deleteById(taskId: string): Promise<void> {
    const connection = getConnection();
    await connection.getRepository(Task).delete({ id: taskId });
  }

  static async findAllWithFilters(filter: TaskFilter): Promise<TaskPaginated> {
    const { startTaskDate, endTaskDate, term, title, category, done, page, perPage } = filter;
    const skip = nextPage(perPage, page);

    const connection = getConnection();
    const query = connection.getRepository(Task)
        .createQueryBuilder('task');

    if(startTaskDate && endTaskDate) {
        query.andWhere(`task.end_date BETWEEN 
        '${startTaskDate}T00:00:00.000' AND '${endTaskDate}T23:59:59.999'`);  
    } 

    if(term) {
        query.andWhere('task.title = :title', { title: term })
          .orWhere('task.category = :category', { category: term })
          .orWhere('task.done = :done', { done: term })
    }

    if(!term) {
        if (title) {
            query.andWhere('task.title = :title', { title: title });
        }

        if (category) {
            query.andWhere('task.category = :category', { category: category });
        }

        if (done) {
            query.andWhere('task.done = :done', { done: done });
        }
    }

    const result = await query
      .orderBy('task.title', 'ASC')
      .skip(skip)
      .take(perPage)
      .getManyAndCount();
    
    const parsedResult = { tasks: result[0], total: result[1] };

    return parsedResult;
  }
}

export { TaskRepository };
