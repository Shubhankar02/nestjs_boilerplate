import { Module } from '@nestjs/common';
import { ExamplesService } from './examples.service';
import { ExamplesController } from './examples.controller';
import { CustomFileReaderService } from '../file/services/custom-file-reader.service';
import { FileModule } from '../file/file.module';
import { EmailModule } from '../email/email.module';
import { PaymentServiceModule } from '../payment-service/payment-service.module';

@Module({
  imports: [
    FileModule,
    EmailModule.forRoot('mailgun'),
    PaymentServiceModule.forRoot('stripe'),
  ],
  providers: [ExamplesService, CustomFileReaderService],
  controllers: [ExamplesController],
})
export class ExamplesModule {}
