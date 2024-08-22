import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { EmailServiceInterface } from '../interfaces/email-service.interface';

@Injectable()
export class SendinblueEmailService implements EmailServiceInterface {
  private client: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      'your-sendinblue-api-key',
    );
    this.client = apiInstance;
  }

  async sendEmail(mailOptions: { to: string; subject: string; body: string }) {
    return this.client.sendTransacEmail({
      sender: { email: 'your-email@your-domain.com' },
      to: [{ email: mailOptions.to }],
      subject: mailOptions.subject,
      textContent: mailOptions.body,
    });
  }
}
