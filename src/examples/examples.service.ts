import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/services/logger.service';
import { FileReaderFactory } from '../file/services/file-reader-factory.service';
import { FileTransformerFactory } from '../file/services/file-transformer-factory.service';
import { CustomFileReaderService } from '../file/services/custom-file-reader.service';

@Injectable()
export class ExamplesService {
  constructor(
    private readonly logger: LoggerService,
    private fileReaderFactory: FileReaderFactory,
    private fileTransformerFactory: FileTransformerFactory,
    private customFileReader: CustomFileReaderService,
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
    const fileData = await this.fileReaderFactory
      .getFileReader(fileType)
      .read(filePath);
    const fileTransformer =
      this.fileTransformerFactory.getFileTransformer(transformerType);
    return fileTransformer.transform(fileData);
  }
}
