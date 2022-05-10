import { TaskModel } from '../../../domain/models';

export type CreateTaskDTO = Omit<
  TaskModel,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface UpdateTaskDTO
  extends Partial<Omit<TaskModel, 'createdAt' | 'updatedAt' | 'deletedAt'>> {
    id: string;
  }

export interface TaskFilter {
  startTaskDate?: string;
  endTaskDate?: string;
  term?: string,
  title?: string;
  category?: string;
  done?: boolean;
  page?: number;
  perPage?: number;
}