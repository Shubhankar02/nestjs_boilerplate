import { Module } from '@nestjs/common';
import { FileReaderFactory } from './factories/file-reader-factory';
import { FileTransformerFactory } from './factories/file-transformer-factory';
import { JsonFileReaderService } from './services/json-file-reader.service';
import { CsvFileReaderService } from './services/csv-file-reader.service';
import { ExcelFileReaderService } from './services/excel-file-reader.service';
import { JsonToCsvTransformerService } from './services/json-to-csv-transformer.service';
import { CsvToJsonTransformerService } from './services/csv-to-json-transformer.service';
import { CustomFileReaderService } from './services/custom-file-reader.service';

@Module({
  providers: [
    FileReaderFactory,
    FileTransformerFactory,
    JsonFileReaderService,
    CsvFileReaderService,
    ExcelFileReaderService,
    JsonToCsvTransformerService,
    CsvToJsonTransformerService,
    CustomFileReaderService,
  ],
  exports: [FileReaderFactory, FileTransformerFactory],
})
export class FileModule {}
