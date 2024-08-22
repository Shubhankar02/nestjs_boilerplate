import { Injectable, Inject, Optional } from '@nestjs/common';
import { EmailServiceInterface } from '../interfaces/email-service.interface';
import { SendGridEmailService } from '../services/sendgrid-email.service';
import { MailgunEmailService } from '../services/mailgun-email.service';
import { AmazonSESEmailService } from '../services/amazon-ses-email.service';
import { PostmarkEmailService } from '../services/postmark-email.service';
import { SendinblueEmailService } from '../services/sendinblue-email.service';
import { SparkPostEmailService } from '../services/sparkpost-email.service';
import { SMTPEmailService } from '../services/smtp-email.service';

@Injectable()
export class EmailServiceFactory {
  private readonly services: Map<string, EmailServiceInterface>;

  constructor(
    @Optional()
    @Inject(SendGridEmailService)
    private sendGridService?: SendGridEmailService,
    @Optional()
    @Inject(MailgunEmailService)
    private mailgunService?: MailgunEmailService,
    @Optional()
    @Inject(AmazonSESEmailService)
    private amazonSEService?: AmazonSESEmailService,
    @Optional()
    @Inject(PostmarkEmailService)
    private postmarkService?: PostmarkEmailService,
    @Optional()
    @Inject(SendinblueEmailService)
    private sendinblueService?: SendinblueEmailService,
    @Optional()
    @Inject(SparkPostEmailService)
    private sparkPostService?: SparkPostEmailService,
    @Optional()
    @Inject(SMTPEmailService)
    private smtpService?: SMTPEmailService,
  ) {
    this.services = new Map<string, EmailServiceInterface>();
    if (sendGridService) this.services.set('sendgrid', sendGridService);
    if (mailgunService) this.services.set('mailgun', mailgunService);
    if (amazonSEService) this.services.set('amazon-ses', amazonSEService);
    if (postmarkService) this.services.set('postmark', postmarkService);
    if (sendinblueService) this.services.set('sendinblue', sendinblueService);
    if (sparkPostService) this.services.set('sparkpost', sparkPostService);
    if (smtpService) this.services.set('smtp', smtpService);
  }

  registerService(type: string, service: EmailServiceInterface) {
    this.services.set(type, service);
  }

  getEmailService(type: string): EmailServiceInterface {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`Email service for type ${type} not found`);
    }
    return service;
  }
}
