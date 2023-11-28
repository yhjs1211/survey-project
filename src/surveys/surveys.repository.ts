import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/inputs/createSurvey.input';
import { UpdateSurveyInput } from './dto/inputs/updateSurvey.input';

@Injectable()
export class SurveysRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}
  async createSurvey(data: CreateSurveyInput) {
    try {
      const survey = this.surveyRepository.create(data);
      const result = await this.surveyRepository.save(survey);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  findSurveyById(id: number): Promise<Survey> {
    try {
      return this.surveyRepository.findOne({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  findAllSurveys(): Promise<Survey[]> {
    try {
      return this.surveyRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  updateSurveyById(data: UpdateSurveyInput): Promise<UpdateResult> {
    try {
      const result = this.dataSource
        .createQueryBuilder()
        .update(Survey)
        .set(data)
        .where('id=:id', { id: data.id })
        .returning('*')
        .execute();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  removeSurveyById(id: number): Promise<DeleteResult> {
    try {
      const result = this.dataSource
        .createQueryBuilder()
        .delete()
        .from(Survey)
        .where('id=:id', { id })
        .returning('*')
        .execute();

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
