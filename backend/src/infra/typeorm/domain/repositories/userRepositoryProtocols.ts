import { User } from '../entities';

export interface UserPaginated {
    users: User[],
    total: number
}

export function nextPage(perPage: number, page?: number) {
    return page ? perPage * page : 0;
}

