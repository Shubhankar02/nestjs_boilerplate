import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class SMTPEmailService implements EmailServiceInterface {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'your-smtp-host',
      port: 587, // or 465 for secure SMTP
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-smtp-username',
        pass: 'your-smtp-password',
      },
    });
  }

  async sendEmail(mailOptions: { to: string; subject: string; body: string }) {
    return this.transporter.sendMail({
      from: 'your-email@your-domain.com',
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.body,
    });
  }
}
