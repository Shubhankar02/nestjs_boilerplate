import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { ExamplesModule } from './examples/examples.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    LoggerModule.forRoot('default'),
    ConfigModule.forRoot(),
    AuthModule,
    ExamplesModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
