import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateSurveyInput {
  @Field({ description: 'Title of survey' })
  @IsNotEmpty()
  title: string;

  @Field({ description: 'Content of survey' })
  @IsNotEmpty()
  content: string;

  @Field(() => GraphQLJSON, {
    description: 'Sequence of survey',
    nullable: true,
  })
  sequence: number[];
}
