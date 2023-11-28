import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Choice } from './types/item.choice';

@ObjectType()
@Entity()
export class Item {
  @Field(() => Int, { description: 'Primary key of item' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => GraphQLJSON)
  @Column({
    type: 'jsonb',
  })
  choice: Choice;
}
