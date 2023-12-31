import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetSurvey {
  @Field(() => Int)
  readonly id: number;
}
