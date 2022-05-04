import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';

@Injectable()
export class FileService {
  imgPath: string;
  constructor() {
    this.imgPath = path.join(process.cwd(), 'src/server/public/img');
  }

  private getHexName(file: Express.Multer.File) {
    const fsHash = crypto.createHash('md5');
    fsHash.update(file.buffer);
    const md5 = fsHash.digest('hex').slice(0, 6);
    const fileParsePath = path.parse(file.originalname);
    const hexFileName = fileParsePath.name + '.' + md5 + fileParsePath.ext;
    return hexFileName;
  }

  async saveFile(file: Express.Multer.File) {
    const saveFileName = this.getHexName(file);
    await fs.writeFile(path.join(this.imgPath, saveFileName), file.buffer);
    return path.join('/img', saveFileName).replace(/\\/g, '/');
  }
}
