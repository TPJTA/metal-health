import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { xmcsProxy, xinliProxy } from './middleware/imageProxy.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use('/xmcs', xmcsProxy);
  app.use('/xinli', xinliProxy);
  app.useStaticAssets(join(process.cwd(), 'src/server/public'));
  app.useStaticAssets(join(process.cwd(), 'src/client/public'));
  await app.listen(3012);
}
bootstrap();
