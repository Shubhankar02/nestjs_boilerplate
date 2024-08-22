export interface EmailServiceInterface {
  sendEmail(mailOptions: {
    to: string;
    subject: string;
    body: string;
  }): Promise<any>;
}
