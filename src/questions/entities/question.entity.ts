import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Question {
  @Field(() => Int, { description: 'Primary key of question' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({
    type: 'text',
  })
  content: string;

  @OneToMany(() => Item, (item) => item.question)
  @Field(() => [Item])
  items: Item[];
}
