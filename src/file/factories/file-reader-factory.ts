import { Injectable } from '@nestjs/common';
import { FileReaderInterface } from '../interfaces/file-reader.interface';
import { JsonFileReaderService } from '../services/json-file-reader.service';
import { CsvFileReaderService } from '../services/csv-file-reader.service';
import { ExcelFileReaderService } from '../services/excel-file-reader.service';

@Injectable()
export class FileReaderFactory {
  private readonly readers: Map<string, FileReaderInterface> = new Map();

  constructor(
    private jsonFileReader: JsonFileReaderService,
    private csvFileReader: CsvFileReaderService,
    private excelFileReader: ExcelFileReaderService,
  ) {
    this.readers.set('json', jsonFileReader);
    this.readers.set('csv', csvFileReader);
    this.readers.set('excel', excelFileReader);
  }

  registerReader(type: string, reader: FileReaderInterface) {
    this.readers.set(type, reader);
  }

  getFileReader(type: string): FileReaderInterface {
    const reader = this.readers.get(type);
    if (!reader) {
      throw new Error(`File reader for type ${type} not found`);
    }
    return reader;
  }
}
