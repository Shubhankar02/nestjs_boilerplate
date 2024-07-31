import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {
  constructor(private databaseService: DatabaseService) {}

  async onModuleInit() {
    await this.databaseService.connect();
  }
}
