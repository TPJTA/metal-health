import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import imageProxy from './libs/imageProxy';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use('/xmcs', imageProxy);
  app.useStaticAssets(join(process.cwd(), 'src/server/public'));
  app.useStaticAssets(join(process.cwd(), 'src/client/public'));
  await app.listen(3012);
}
bootstrap();
