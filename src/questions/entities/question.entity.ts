import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @OneToMany(()=>Item,(item)=>item.questions)
  // items: Item[]
}
