import { InputType, Int, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Choice } from '../entities/types/result.choice';

@InputType()
export class CreateResultInput {
  @Field(() => Int)
  surveyId: number;

  @Field(() => GraphQLJSON)
  choice: Choice;

  @Field({ nullable: true, defaultValue: 0 })
  totalScore: number;
}
