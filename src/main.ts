import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:2929', // Update with your frontend URL
    credentials: true, // Allows cookies to be sent
  });
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 2929);
}
bootstrap();
