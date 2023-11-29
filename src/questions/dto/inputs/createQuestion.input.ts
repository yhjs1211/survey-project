import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field({ description: 'Content of Question.' })
  content: string;
}
