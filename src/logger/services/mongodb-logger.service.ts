// src/logger/services/mongodb-logger.service.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-mongodb';
import { LoggerService } from './logger.service';

@Injectable()
export class MongoDBLoggerService extends LoggerService {
  constructor() {
    super();
    this.logger.add(
      new winston.transports.MongoDB({
        db: 'mongodb://localhost:27017/logs',
        collection: 'log_entries',
        level: 'info',
        options: { useUnifiedTopology: true },
      }),
    );
  }
}
