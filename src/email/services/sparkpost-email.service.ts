import { Injectable } from '@nestjs/common';
import * as SparkPost from 'sparkpost';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class SparkPostEmailService implements EmailServiceInterface {
  private client: SparkPost;

  constructor() {
    this.client = new SparkPost('your-sparkpost-api-key');
  }

  async sendEmail(mailOptions: { to: string; subject: string; body: string }) {
    return this.client.transmissions.send({
      content: {
        from: 'your-email@your-domain.com',
        subject: mailOptions.subject,
        text: mailOptions.body,
      },
      recipients: [{ address: mailOptions.to }],
    });
  }
}
