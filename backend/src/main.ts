import { NestFactory } from '@nestjs/core';
import { EncuestaModule } from './encuestas/encuesta.module';

async function bootstrap() {
  const app = await NestFactory.create(EncuestaModule);

  // Habilita CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:3001', // Cambia si usas otro puerto en Next
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
