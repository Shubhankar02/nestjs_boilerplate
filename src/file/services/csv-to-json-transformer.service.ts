import { Injectable } from '@nestjs/common';
import { FileTransformerInterface } from '../interfaces/file-transformer.interface';

@Injectable()
export class CsvToJsonTransformerService implements FileTransformerInterface {
  transform(data: any): any {
    return JSON.stringify(data);
  }
}
