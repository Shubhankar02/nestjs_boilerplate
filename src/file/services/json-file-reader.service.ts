import * as fs from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { FileReaderInterface } from '../interfaces/file-reader.interface';

@Injectable()
export class JsonFileReaderService implements FileReaderInterface {
  async read(filePath: string): Promise<any> {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }
}
