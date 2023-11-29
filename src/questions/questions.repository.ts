import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/inputs/createQuestion.input';

@Injectable()
export class QuestionsRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  findQuestionById(id: number): Promise<Question> {
    try {
      return this.questionRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  findAllQuestions(): Promise<Question[]> {
    try {
      return this.questionRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  createQuestion(data: CreateQuestionInput): Promise<Question> {
    try {
      const question = this.questionRepository.create(data);
      return this.questionRepository.save(question);
    } catch (error) {
      console.log(error);
    }
  }

  updateQuestion(id: number, content: string): Promise<UpdateResult> {
    try {
      return this.dataSource
        .createQueryBuilder()
        .update(Question)
        .set({ content })
        .where('id=:id', { id })
        .returning('*')
        .execute();
    } catch (error) {
      console.log(error);
    }
  }

  deleteQuestion(id: number): Promise<DeleteResult> {
    try {
      return this.dataSource
        .createQueryBuilder()
        .delete()
        .from(Question)
        .where('id=:id', { id })
        .returning('*')
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
