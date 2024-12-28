import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await (await app.resolve('sequelize')).sync({ force: true });
  await app.listen(3000);
}
bootstrap();
