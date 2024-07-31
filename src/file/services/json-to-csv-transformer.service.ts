import { Injectable } from '@nestjs/common';
import * as json2csv from 'json2csv';
import { FileTransformerInterface } from '../interfaces/file-transformer.interface';

@Injectable()
export class JsonToCsvTransformerService implements FileTransformerInterface {
  transform(data: any): any {
    return json2csv.parse(data);
  }
}
