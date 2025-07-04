import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/services/logger.service';
import { FileReaderFactory } from '../file/factories/file-reader-factory';
import { FileTransformerFactory } from '../file/factories/file-transformer-factory';
import { CustomFileReaderService } from '../file/services/custom-file-reader.service';
import { EmailServiceInterface } from '../email/interfaces/email-service.interface';
import { PaymentServiceInterface } from '../payment-service/interfaces/payment-service.interface';
import { CsvFileReaderService } from '../file/services/csv-file-reader.service';

@Injectable()
export class ExamplesService {
  constructor(
    private readonly logger: LoggerService,
    private fileReaderFactory: FileReaderFactory,
    private fileTransformerFactory: FileTransformerFactory,
    private customFileReader: CustomFileReaderService,
    private csvFileReader: CsvFileReaderService,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
    @Inject('PaymentService')
    private readonly paymentService: PaymentServiceInterface,
  ) {}

  async exampleLogs() {
    this.logger.log('This is an info log');
    this.logger.error('This is an error log', 'Stack trace here');
  }

  async readAndTransformFile(
    filePath: string,
    fileType: string, // Default file types are json, csv and excel. You can also pass the `custom` and pass the customFileReader
    transformerType: string, // Available options are `jsonToCsv` and `csvToJson`
  ) {
    // Register a custom reader if needed, or rely on the defaults
    // this.fileReaderFactory.registerReader('custom', this.customFileReader);
    // this.fileReaderFactory.registerReader('csv', this.csvFileReader);
    const fileData = await this.fileReaderFactory
      .getFileReader(fileType)
      .read(filePath);
    const fileTransformer =
      this.fileTransformerFactory.getFileTransformer(transformerType);
    return fileTransformer.transform(fileData);
  }

  async sendEmail(data: { to: string; subject: string; body: string }) {
    await this.emailService.sendEmail({
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  }

  async processPayment() {
    return await this.paymentService.initializePayment(
      1000,
      'USD',
      'Payment Description',
    );
  }

  async verifyPayment(paymentId: string) {
    return await this.paymentService.verifyPayment(paymentId);
  }
}
