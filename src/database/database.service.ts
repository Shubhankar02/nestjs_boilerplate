import { Injectable } from '@nestjs/common';
import { databaseConfig } from './database.config';
import { createConnection, Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  async connect() {
    this.connection = await createConnection({
      type: databaseConfig.type,
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [], // specify your entities here
      synchronize: true, // set to false in production
    });
  }

  getConnection(): Connection {
    return this.connection;
  }
}
