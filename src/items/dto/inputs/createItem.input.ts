import { InputType, Int, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Choice } from 'src/items/entities/types/item.choice';

@InputType()
export class CreateItemInput {
  @Field(() => Int, { description: 'ID of Survey' })
  surveyId: number;

  @Field(() => Int, { description: 'ID of Question' })
  questionId: number;

  @Field(() => GraphQLJSON, { description: 'Items of Question' })
  choice: Choice;
}
