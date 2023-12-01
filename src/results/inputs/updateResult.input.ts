import { CreateResultInput } from './createResult.input';
import { InputType, Field, Int, PickType } from '@nestjs/graphql';

@InputType()
export class UpdateResultInput extends PickType(CreateResultInput, [
  'choice',
] as const) {
  @Field(() => Int)
  id: number;
}
