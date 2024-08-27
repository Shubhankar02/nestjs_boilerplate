import { Module, DynamicModule } from '@nestjs/common';
import { SendGridEmailService } from './services/sendgrid-email.service';
import { MailgunEmailService } from './services/mailgun-email.service';
import { AmazonSESEmailService } from './services/amazon-ses-email.service';
import { PostmarkEmailService } from './services/postmark-email.service';
import { SendinblueEmailService } from './services/sendinblue-email.service';
import { SparkPostEmailService } from './services/sparkpost-email.service';
import { SMTPEmailService } from './services/smtp-email.service';
import { EmailServiceFactory } from './factories/email.factory';

@Module({})
export class EmailModule {
  static forRoot(
    serviceType:
      | 'sendgrid'
      | 'mailgun'
      | 'aws-ses'
      | 'postmark'
      | 'sendinblue'
      | 'sparkpost'
      | 'smtp'
      | 'custom',
  ): DynamicModule {
    let service;
    switch (serviceType) {
      case 'sendgrid':
        service = SendGridEmailService;
        break;
      case 'mailgun':
        service = MailgunEmailService;
        break;
      case 'aws-ses':
        service = AmazonSESEmailService;
        break;
      case 'postmark':
        service = PostmarkEmailService;
        break;
      case 'sendinblue':
        service = SendinblueEmailService;
        break;
      case 'sparkpost':
        service = SparkPostEmailService;
        break;
      case 'smtp':
        service = SMTPEmailService;
        break;
      default:
        throw new Error(`Email service type ${serviceType} is not supported`);
    }

    return {
      module: EmailModule,
      providers: [
        EmailServiceFactory,
        service,
        {
          provide: 'EmailService',
          useExisting: service,
        },
      ],
      exports: ['EmailService'],
    };
  }
}
