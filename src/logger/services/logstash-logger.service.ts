import { Injectable } from '@nestjs/common';
import { LogstashTransport } from 'winston-logstash-transport';
import { LoggerService } from './logger.service';

@Injectable()
export class LogstashLoggerService extends LoggerService {
  constructor() {
    super();
    this.logger.add(
      new LogstashTransport({
        port: 5044,
        host: 'localhost',
        node_name: 'my-node',
      }),
    );
  }
}
