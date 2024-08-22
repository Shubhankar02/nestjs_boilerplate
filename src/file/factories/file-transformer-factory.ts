import { Injectable, Inject, Optional } from '@nestjs/common';
import { FileTransformerInterface } from '../interfaces/file-transformer.interface';
import { JsonToCsvTransformerService } from '../services/json-to-csv-transformer.service';
import { CsvToJsonTransformerService } from '../services/csv-to-json-transformer.service';

@Injectable()
export class FileTransformerFactory {
  private readonly transformers: Map<string, FileTransformerInterface> =
    new Map();

  constructor(
    private jsonToCsvTransformer: JsonToCsvTransformerService,
    private csvToJsonTransformer: CsvToJsonTransformerService,
  ) {
    this.registerTransformer('jsonToCsv', jsonToCsvTransformer);
    this.registerTransformer('csvToJson', csvToJsonTransformer);
  }

  registerTransformer(type: string, transformer: FileTransformerInterface) {
    this.transformers.set(type, transformer);
  }

  getFileTransformer(type: string): FileTransformerInterface {
    const transformer = this.transformers.get(type);
    if (!transformer) {
      throw new Error(`File transformer for type ${type} not found`);
    }
    return transformer;
  }
}
