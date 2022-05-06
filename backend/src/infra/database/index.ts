import 'reflect-metadata';
import {
  Connection,
  createConnection,
  getConnectionManager,
} from 'typeorm';

createConnection();

// export class TypeOrmHelper {
    
//   static async getDomainConnection() {
//     return this.getConnection("to_do_list");
//   }

//   private static async getConnection(schema: string): Promise<Connection> {
//     console.log("getConnection")
//     try {
//       const connectionManager = getConnectionManager();
//       if (connectionManager.has(schema)) {
//         const connection = connectionManager.get(schema);

//         if (connection.isConnected) {
//           return connection;
//         }

//         return connection.connect();  
//       } else {
//         console.log("connection");
//         const connection = await createConnection();

//         console.log(connection);

//         return connection;
//       }
//     } catch (error: any) {
//       throw new Error('Not found connection, please try again');
//     }
//   }

//   static async disconnect(schema: string): Promise<void> {
//     const connection = await this.getConnection(schema);
//     await connection.close();
//   }
// }