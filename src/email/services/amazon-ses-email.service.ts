import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class AmazonSESEmailService implements EmailServiceInterface {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async sendEmail(mailOptions: { to: string; subject: string; body: string }) {
    const params = {
      Source: 'your-email@domain-name.com', // Put your own domain email address
      Destination: {
        ToAddresses: [mailOptions.to],
      },
      Message: {
        Subject: {
          Data: mailOptions.subject,
        },
        Body: {
          Text: {
            Data: mailOptions.body,
          },
        },
      },
    };

    const command = new SendEmailCommand(params);
    return this.sesClient.send(command);
  }
}
