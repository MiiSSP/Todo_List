import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('To-do List')
  .setDescription('Projeto To-do List')
  .setContact('Milena Santos', 'https://github.com/MiiSSP', 'milena.souzasp@hotmail.com')
  .setVersion ('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/swagger', app, document)
    
  await app.listen(process.env.PORT || 3000);

  process.env.TZ = `-03:00`

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
}
bootstrap();
