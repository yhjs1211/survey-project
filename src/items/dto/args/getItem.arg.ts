import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetItem {
  @Field(() => Int)
  surveyId: number;

  @Field(() => Int)
  questionId: number;
}
