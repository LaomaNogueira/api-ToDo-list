import { User } from '../entities/user';
import { getConnection } from 'typeorm';
import { UserPaginated, nextPage } from './userRepositoryProtocols';

class UserRepository {

    static async create(
       userDTO: Partial<Omit<User, 'id'>>
    ): Promise<User> {
        const connection = getConnection();
        const emailExists = await connection.getRepository(User).findOne({
            where: { email: userDTO.email }
        });

        if(emailExists) {
            throw new Error(JSON.stringify({ message: 'Email or CPF is already in use, try with another one.' }));
        }

        const result = await connection.getRepository(User).save(userDTO);
        return result;
    }

    static async findByEmail(
        emailReq: string
     ): Promise<User> {
         const connection = getConnection();
         const result = await connection.getRepository(User).findOne({
             where: { email: emailReq }
         })

         return result;
     }

    static async findAll(perPage: number, page?: number): Promise<UserPaginated> {
        const skip = nextPage(perPage, page)
        const connection = getConnection();
        const result = await connection.getRepository(User).findAndCount({
            skip: skip,
            take: perPage
        });

        const parsedResult = { users: result[0], total: result[1] };

        return parsedResult;
    }

    static async findById(userId: string): Promise<User> {
        const connection = getConnection();
        const result = await connection.getRepository(User).findOne({
            where: { id: userId }
        });
        
        return result;
    }

    // static async updateById(
    //     userId: string,
    //     attributes: Partial<Omit<User, 'id' | 'hospitalId'>>
    //     ): Promise<User> {

    //     const connection = await TypeORM.getDomainConnection();
    //     const result = await connection.getRepository(User).update(
    //         { id: userId },
    //         { ...attributes }
    // ).then(async () => {
    //     return connection.getRepository(User).findOne({ id: userId });
    // });

    // return result;
    // }

    // static async deleteById(userId: string): Promise<void> {
    //     const connection = await TypeORM.getDomainConnection();
    //     await connection.getRepository(User).delete({ id: userId });
    // }
}

export { UserRepository };
