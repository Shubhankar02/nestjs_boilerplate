import { Injectable } from '@nestjs/common';
import { FileReaderInterface } from '../interfaces/file-reader.interface';

@Injectable()
export class CustomFileReaderService implements FileReaderInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async read(filePath: string): Promise<any> {
    // Implement your custom file reading logic here
    return 'Custom file content'; // Example implementation
  }
}
