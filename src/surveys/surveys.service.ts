import { SurveysRepository } from './surveys.repository';
import { Injectable } from '@nestjs/common';
import { CreateSurveyInput } from './dto/inputs/createSurvey.input';
import { UpdateSurveyInput } from './dto/inputs/updateSurvey.input';

@Injectable()
export class SurveysService {
  constructor(private surveyRepository: SurveysRepository) {}
  async createSurvey(createSurveyInput: CreateSurveyInput) {
    return await this.surveyRepository.createSurvey(createSurveyInput);
  }

  findAll() {
    return `This action returns all surveys`;
  }

  findOne(id: number) {
    return this.surveyRepository.findSurveyById(id);
  }

  update(id: number, updateSurveyInput: UpdateSurveyInput) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
