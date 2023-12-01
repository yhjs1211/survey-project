import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultInput } from './inputs/createResult.input';

@Injectable()
export class ResultsRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  findResultById(id: number): Promise<Result> {
    try {
      return this.resultRepository.findOne({
        where: { id },
        relations: { survey: true },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findResultsBySurveyId(surveyId: number): Promise<Result[]> {
    try {
      return this.resultRepository.find({ where: { surveyId } });
    } catch (error) {
      console.log(error);
    }
  }

  upsertResult(dto?: CreateResultInput, result?: Result): Promise<Result> {
    try {
      if (result) {
        return this.resultRepository.save(result);
      } else {
        const result: Result = this.resultRepository.create(dto);

        return this.resultRepository.save(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteResult(id: number): Promise<DeleteResult> {
    try {
      return this.dataSource
        .createQueryBuilder()
        .delete()
        .from(Result)
        .where('id=:id', { id })
        .returning('*')
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
