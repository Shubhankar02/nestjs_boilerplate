import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { ExamplesModule } from './examples/examples.module';
import { FileModule } from './file/file.module';
import { EmailModule } from './email/email.module';
import { PaymentServiceModule } from './payment-service/payment-service.module';
import { UploadModule } from './upload/upload.module';
import { UploadService } from './upload/upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { CrmModule } from './crm/crm.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: UploadService, // Register the upload service for Multer options
    }),
    LoggerModule.forRoot('default'),
    ConfigModule.forRoot(),
    AuthModule,
    ExamplesModule,
    FileModule,
    EmailModule,
    PaymentServiceModule,
    UploadModule,
    CrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
