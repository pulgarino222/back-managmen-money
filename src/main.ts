import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerCustomOptions } from './config/swagger.config';

const PORT=process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Asegúrate de que este sea el dominio de tu frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, swaggerCustomOptions)
 
  await app.listen(PORT,()=>{
    console.log(
      `run on port${PORT} adress:http://localhost:${PORT}  swagger:http://localhost:${PORT}/api `,
      )
  });
}
bootstrap();
