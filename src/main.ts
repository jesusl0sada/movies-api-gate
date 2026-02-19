import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Usamos el puerto del .env o el 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}

// Corregimos el error de lint añadiendo el catch para la promesa
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
