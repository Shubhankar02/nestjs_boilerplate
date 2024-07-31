import { Controller, Get } from '@nestjs/common';
import { ExamplesService } from './examples.service';

@Controller('examples')
export class ExamplesController {
  constructor(private readonly exampleService: ExamplesService) {}

  @Get('logs')
  exampleLogs() {
    return this.exampleService.exampleLogs();
  }
}
