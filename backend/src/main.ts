import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ENABLE CORS
  app.enableCors({
    origin: 'http://localhost:5173', // React frontend
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
