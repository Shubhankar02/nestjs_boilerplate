import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/services/logger.service';

@Injectable()
export class ExamplesService {
  constructor(private readonly logger: LoggerService) {}

  async exampleLogs() {
    this.logger.log('This is an info log');
    this.logger.error('This is an error log', 'Stack trace here');
  }
}
