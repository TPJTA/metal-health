import {
  Controller,
  Get,
  UploadedFile,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileDir = await this.fileService.saveFile(file);
    return { data: fileDir };
  }
}
