import { CreateQuestionInput } from './createQuestion.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput extends CreateQuestionInput {
  @Field(() => Int)
  id: number;
}
