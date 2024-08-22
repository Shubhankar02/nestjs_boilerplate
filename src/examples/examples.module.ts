import { Module } from '@nestjs/common';
import { ExamplesService } from './examples.service';
import { ExamplesController } from './examples.controller';
import { CustomFileReaderService } from '../file/services/custom-file-reader.service';
import { FileModule } from '../file/file.module';
import { EmailModule } from '../email/email.module';
import { PaymentServiceModule } from '../payment-service/payment-service.module';
import { CrmModule } from '../crm/crm.module';

@Module({
  imports: [
    FileModule,
    EmailModule.forRoot('sendgrid'),
    PaymentServiceModule.forRoot('stripe'),
    CrmModule.forRoot('hubspot'),
  ],
  providers: [ExamplesService, CustomFileReaderService],
  controllers: [ExamplesController],
})
export class ExamplesModule {}
