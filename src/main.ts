import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLExceptionFilter } from './common/graphql.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GraphQLExceptionFilter());
  await app.listen(4000);

  console.log(`GraphQL Link => http://localhost:4000/graphql`);
}
bootstrap();
