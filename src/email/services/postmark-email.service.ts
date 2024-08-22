import { Injectable } from '@nestjs/common';
import * as postmark from 'postmark';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class PostmarkEmailService implements EmailServiceInterface {
  private client: postmark.ServerClient;

  constructor() {
    this.client = new postmark.ServerClient('your-postmark-api-key');
  }

  async sendEmail(mailOptions: { to: string; subject: string; body: string }) {
    return this.client.sendEmail({
      From: 'your-email@your-domain.com',
      To: mailOptions.to,
      Subject: mailOptions.subject,
      TextBody: mailOptions.body,
    });
  }
}
