import { UserModel } from '../../../domain/models';

export type CreateUserDTO = Omit<
UserModel,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface UpdateUserDTO
  extends Partial<Omit<UserModel, 'createdAt' | 'updatedAt' | 'deletedAt'>> {
    id: string;
  }


// export interface UserFilter {
//   startNotificationDate?: string;
//   endNotificationDate?: string;
//   hospitalBed?: string;
//   attendance?: number;
//   score?: number;
//   page?: number;
// }
