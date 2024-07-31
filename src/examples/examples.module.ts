import { Module } from '@nestjs/common';
import { ExamplesService } from './examples.service';
import { ExamplesController } from './examples.controller';
import { CustomFileReaderService } from '../file/services/custom-file-reader.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  providers: [ExamplesService, CustomFileReaderService],
  controllers: [ExamplesController],
})
export class ExamplesModule {}
