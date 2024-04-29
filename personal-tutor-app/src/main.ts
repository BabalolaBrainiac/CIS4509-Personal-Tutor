import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle('CIS 4509 Personal Tutor Application')
      .setDescription('CIS 4509 Personal Tutor Application: Group Members Include Amen Victor, Champion OvuaKnporie, Kenechukwu Nkwonta, Olakunle Afolabi, Babalola Opeyemi Daniel')
      .setVersion('1.0')
      .addServer('http://localhost:3000/', 'Local environment')
      .addServer('https://ravishing-art-development.up.railway.app', 'Production')
      .addTag('CIS 4509 Personal Tutor Application')
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000, );
}
bootstrap();
