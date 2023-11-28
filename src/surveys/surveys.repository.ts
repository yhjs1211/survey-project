import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/inputs/createSurvey.input';

@Injectable()
export class SurveysRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}
  async createSurvey(data: CreateSurveyInput) {
    try {
      const survey = await this.surveyRepository.create(data);
      const result = await this.surveyRepository.save(survey);
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  findSurveyById(id: number) {
    try {
      return this.surveyRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
    }
  }
}
