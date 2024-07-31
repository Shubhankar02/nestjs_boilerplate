import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { FileReaderInterface } from '../interfaces/file-reader.interface';

@Injectable()
export class ExcelFileReaderService implements FileReaderInterface {
  async read(filePath: string): Promise<any[]> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  }
}
