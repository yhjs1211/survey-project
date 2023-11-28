import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSurveyInput {
  @Field({ description: 'Title of survey' })
  @IsNotEmpty()
  title: string;

  @Field({ description: 'Content of survey' })
  @IsNotEmpty()
  content: string;

  @Field({
    description: 'Sequence of survey',
    defaultValue: '[]',
  })
  sequence: string;
}
