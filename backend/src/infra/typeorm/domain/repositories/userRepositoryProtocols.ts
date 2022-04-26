import { User } from '../entities';

export interface UserPaginated {
    user: User[],
    total: number
}


