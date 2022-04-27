import * as crypto from 'crypto';
import * as path from 'path';

/**输出带有hex的文件名 */
export const getHexName = (file: Express.Multer.File) => {
  const fsHash = crypto.createHash('md5');
  fsHash.update(file.buffer);
  const md5 = fsHash.digest('hex').slice(0, 6);
  const fileParsePath = path.parse(file.originalname);
  const hexFileName = fileParsePath.name + '.' + md5 + fileParsePath.ext;
  return hexFileName;
};
