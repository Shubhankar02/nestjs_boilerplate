import { Module, Global, DynamicModule } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { MongoDBLoggerService } from './services/mongodb-logger.service';
import { LogstashLoggerService } from './services/logstash-logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(
    loggerType: 'default' | 'mongodb' | 'logstash',
  ): DynamicModule {
    let loggerService;
    switch (loggerType) {
      case 'mongodb':
        loggerService = MongoDBLoggerService;
        break;
      case 'logstash':
        loggerService = LogstashLoggerService;
        break;
      case 'default':
      default:
        loggerService = LoggerService;
        break;
    }
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useClass: loggerService,
        },
      ],
      exports: [LoggerService],
    };
  }
}
