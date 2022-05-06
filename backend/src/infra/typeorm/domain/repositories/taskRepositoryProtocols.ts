import { Task } from '../entities';

export interface TaskPaginated {
    tasks: Task[],
    total: number
}
