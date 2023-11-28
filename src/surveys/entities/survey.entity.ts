import { ObjectType, Field, Int } from '@nestjs/graphql';
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

  @Field()
  @Column({
    nullable: true,
    default: '[]',
  })
  sequence: string;

  @OneToMany(() => Result, (result) => result.survey)
  @Field(() => [Result])
  results: Result[];
}
