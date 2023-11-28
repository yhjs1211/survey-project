import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSurveyInput } from './createSurvey.input';

@InputType()
export class UpdateSurveyInput extends PartialType(CreateSurveyInput) {
  @Field(() => Int)
  id: number;
}
