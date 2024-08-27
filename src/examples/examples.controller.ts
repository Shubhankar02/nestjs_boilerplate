import { Controller, Get, Post } from '@nestjs/common';
import { ExamplesService } from './examples.service';

@Controller('examples')
export class ExamplesController {
  constructor(private readonly exampleService: ExamplesService) {}

  @Get('logs')
  exampleLogs() {
    return this.exampleService.exampleLogs();
  }

  @Post('email')
  sendEmail() {
    return this.exampleService.sendEmail({
      to: 'shborade@gmail.com',
      subject: 'test',
      body: 'sample body',
    });
  }
}
