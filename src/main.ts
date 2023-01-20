import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({}));
  const options = new DocumentBuilder()
    .setTitle('Nest JS API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http', 
        in: 'Header'
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);


  const port =process.env.PORT || 3000
  await app.listen(port);
}
bootstrap();
