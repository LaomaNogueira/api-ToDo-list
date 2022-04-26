import { User } from '../entities/user';
import { TypeORM } from '../../typeORMConfig';
// import { UserPaginated } from '.';

class NotificationNewsRepository {

    // static async create(
    //     healthcareProfessionalDTO: Partial<Omit<User, 'id'>>
    // ): Promise<User> {
    //     const connection = await TypeORM.getDomainConnection();
    //     const result = await connection.getRepository(User).save(healthcareProfessionalDTO);
    //     return result;
    // }

    // static async findById(healthcareProfessionalId: string, hospitalId: string): Promise<User> {
    //     const connection = await TypeORM.getDomainConnection();
    //     const result = await connection.getRepository(User).findOne({
    //         where: {
    //         id: healthcareProfessionalId,
    //         hospitalId: hospitalId
    //         }
    //     });
    //     return result;
    // }

    // static async updateById(
    //     healthcareProfessionalId: string,
    //     attributes: Partial<Omit<User, 'id' | 'hospitalId'>>
    //     ): Promise<User> {

    //     const connection = await TypeORM.getDomainConnection();
    //     const result = await connection.getRepository(User).update(
    //         { id: healthcareProfessionalId },
    //         { ...attributes }
    // ).then(async () => {
    //     return connection.getRepository(User).findOne({ id: healthcareProfessionalId });
    // });

    // return result;
    // }

    // static async deleteById(healthcareProfessionalId: string): Promise<void> {
    //     const connection = await TypeORM.getDomainConnection();
    //     await connection.getRepository(User).delete({ id: healthcareProfessionalId });
    // }
}

export { NotificationNewsRepository };
