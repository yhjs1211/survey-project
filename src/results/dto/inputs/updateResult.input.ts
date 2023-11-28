import { CreateResultInput } from './createResult.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResultInput extends PartialType(CreateResultInput) {
  @Field(() => Int)
  id: number;
}
