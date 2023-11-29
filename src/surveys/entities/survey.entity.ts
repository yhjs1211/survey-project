import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Item } from 'src/items/entities/item.entity';
import { Result } from 'src/results/entities/result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Survey {
  @Field(() => Int, { description: 'Primary Key of Survey' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Field()
  @Column({
    type: 'text',
  })
  content: string;

  @Field(() => GraphQLJSON)
  @Column({
    type: 'jsonb',
    nullable: true,
    default: [],
  })
  sequence: number[];

  @OneToMany(() => Result, (result) => result.survey)
  @Field(() => [Result])
  results: Result[];

  @OneToMany(() => Item, (item) => item.survey)
  @Field(() => [Item])
  items: Item[];
}
