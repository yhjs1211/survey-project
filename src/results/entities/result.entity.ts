import { Choice } from './types/result.choice';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Survey } from 'src/surveys/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Result {
  @Field(() => Int, { description: 'Primary key of result' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => GraphQLJSON, {
    description: 'Object of answers selected by client.',
  })
  @Column({
    type: 'jsonb',
  })
  choice: Choice;

  @Field(() => Int)
  @Column()
  totalScore: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Survey, (survey) => survey.results, { onDelete: 'CASCADE' })
  @Field(() => Survey)
  survey: Survey;
}
