import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetQuestion {
  @Field(() => Int)
  readonly id: number;
}
