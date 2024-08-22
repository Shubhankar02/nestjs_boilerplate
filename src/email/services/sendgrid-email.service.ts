import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class SendGridEmailService implements EmailServiceInterface {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(mailOptions: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void> {
    const msg = {
      to: mailOptions.to,
      from: 'your-email@example.com', // Use your verified sender
      subject: mailOptions.subject,
      text: mailOptions.body,
    };
    await sgMail.send(msg);
  }
}
