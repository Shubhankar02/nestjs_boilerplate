import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class MailgunEmailService implements EmailServiceInterface {
  private mg: mailgun.Mailgun;

  constructor() {
    this.mg = mailgun({
      apiKey: 'your-mailgun-api-key',
      domain: 'your-domain.com',
    });
  }

  async sendEmail(mailOptions: { to: string; subject: string; body: string }) {
    return this.mg.messages().send({
      from: 'your-email@your-domain.com',
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.body,
    });
  }
}
