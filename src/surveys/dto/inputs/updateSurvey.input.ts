import { CreateSurveyInput } from './createSurvey.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSurveyInput extends PartialType(CreateSurveyInput) {
  @Field(() => Int)
  id: number;
}
