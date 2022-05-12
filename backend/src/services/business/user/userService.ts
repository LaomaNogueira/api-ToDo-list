import { UserRepository } from '../../../infra/typeorm/domain/repositories/userRepository';
import { UserModel } from '../../../domain/models';
import {
  CreateUserDTO,
  UpdateUserDTO,
} from './userServiceProtocols';
import Joi from 'joi';
import { validateSchema } from '../../helpers/validateSchema';
import { EnumServiceError } from '../enumServiceError';
import { UserPaginated } from '../../../infra/typeorm/domain/repositories/';

class UserService {

  static async create(userDTO: CreateUserDTO): Promise<UserModel> {
    const userSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().pattern(/^[a-zA-Z0-9]{8,20}$/).required()
    });

    validateSchema(userSchema, userDTO);

    const emailExists = await UserRepository.findByEmail(userDTO.email)
      .catch(() => {
        throw new Error(EnumServiceError.NOT_CREATED);
      }
    );

    if(emailExists) {
      throw new Error(EnumServiceError.EMAIL_EXISTS);
    }
    
    const createdUser = await UserRepository.create({ ...userDTO }).catch(() => {
      throw new Error(EnumServiceError.NOT_CREATED);
    });

    return createdUser;
  }

  static async findAll(perPage: number, page?: number): Promise<UserPaginated> {

    const user = await UserRepository.findAll(perPage, page).catch(() => {
      throw new Error(EnumServiceError.NOT_FOUND);
    });

    return user;
  }

  static async findById(userId: string): Promise<UserModel> {
    const userFound = await UserRepository.findById(userId).catch(() => {
      throw new Error(EnumServiceError.NOT_FOUND);
    });

    if (!userFound) {
      throw new Error(EnumServiceError.NOT_FOUND);
    }

    return userFound;
  }

  static async updateById(updateUserDTO: UpdateUserDTO): Promise<UserModel> {
    const { id } = updateUserDTO;
    delete updateUserDTO.id;

    const userSchema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().pattern(/^[a-zA-Z0-9]{3,15}$/)
    });

    validateSchema(userSchema, updateUserDTO);

    await this.findById(id);
    const updatedUser = await UserRepository.updateById(id, { ...updateUserDTO })
      .catch(() => {
        throw new Error(EnumServiceError.NOT_UPDATED);
      });

    return updatedUser;
  }

  static async deleteById(userId: string): Promise<UserModel> {
    const userToDelete = await this.findById(userId);

    await UserRepository.deleteById(userId).catch(() => {
      throw new Error(EnumServiceError.NOT_DELETED);
    });

    return userToDelete;
  }
}

export { UserService };
