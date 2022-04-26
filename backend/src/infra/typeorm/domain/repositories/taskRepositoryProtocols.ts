import { Task } from '../entities';

export interface TaskPaginator {
    tasks: Task[],
    total: number
}
