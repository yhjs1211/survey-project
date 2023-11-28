import { CreateItemInput } from './createItem.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => Int)
  id: number;
}
