import 'reflect-metadata';
import {
  Connection,
  createConnection,
  EntityTarget,
  getConnectionManager,
} from 'typeorm';
import sqlite3 from 'sqlite3';
import { Task, User } from './domain/entities';

export class TypeOrmHelper {
  private static entities: any[] = [Task, User];
  private static integrationEntities: any[] = [];

  // static setupEntities(entities: any[]): void {
  //   this.entities = [
  //     ...this.entities, 
  //     ...entities
  //   ];
  // }

  static async getDomainConnection() {
    return this.getConnection("to_do_list");
  }

  private static async getConnection(schema: string): Promise<Connection> {
    console.log("getConnection")
    try {
      const connectionManager = getConnectionManager();
      console.log(connectionManager);
      if (connectionManager.has(schema)) {
        const connection = connectionManager.get(schema);

        if (connection.isConnected) {
          return connection;
        }

        return connection.connect();
      } else {
        console.log("connection");
        const connection = await createConnection({
          database: 'todo',
          entities: this.entities,
          synchronize: true,
          type: 'sqlite'
        });

        console.log(connection.entityMetadatas);

        return connection;
      }
    } catch (error: any) {
      throw new Error('Not found connection, please try again');
    }
  }

  static async disconnect(schema: string): Promise<void> {
    const connection = await this.getConnection(schema);
    await connection.close();
  }

  static async clear<T>(typeOrmEntity: EntityTarget<T>, schema: string): Promise<void> {
    const connection = await this.getConnection(schema);
    await connection.getRepository(typeOrmEntity).clear();
  }
}
