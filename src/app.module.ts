import { Module } from '@nestjs/common';
import { SurveysModule } from './surveys/surveys.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Survey } from './surveys/entities/survey.entity';
import { ItemsModule } from './items/items.module';
import { QuestionsModule } from './questions/questions.module';
import { ResultsModule } from './results/results.module';
import { Result } from './results/entities/result.entity';
import GraphQLJSON from 'graphql-type-json';
import { Question } from './questions/entities/question.entity';
import { Item } from './items/entities/item.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      resolvers: {
        JSON: GraphQLJSON,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      schema: process.env.DB_SCHEMA,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 5432,
      entities: [Survey, Result, Question, Item],
      synchronize: true,
      logging: false,
    }),
    SurveysModule,
    ItemsModule,
    QuestionsModule,
    ResultsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
