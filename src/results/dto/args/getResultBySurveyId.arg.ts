import { ArgsType, Field } from '@nestjs/graphql';
import { Result } from 'src/results/entities/result.entity';

@ArgsType()
export class GetResultBySurveyId {
  @Field(() => [Result])
  surveyId: number;
}
