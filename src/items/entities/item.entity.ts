import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Choice } from './types/item.choice';
import { Survey } from 'src/surveys/entities/survey.entity';
import { Question } from 'src/questions/entities/question.entity';

@ObjectType()
@Entity()
export class Item {
  @Field(() => GraphQLJSON)
  @Column({
    type: 'jsonb',
  })
  choice: Choice;

  @Field(() => Int)
  @PrimaryColumn()
  surveyId: number;

  @Field(() => Int)
  @PrimaryColumn()
  questionId: number;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.items)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.items)
  @JoinColumn({ name: 'questionId' })
  question: Question;
}
