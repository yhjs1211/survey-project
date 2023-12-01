import { SurveysRepository } from './surveys.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSurveyInput } from './dto/inputs/createSurvey.input';
import { UpdateSurveyInput } from './dto/inputs/updateSurvey.input';
import { Survey } from './entities/survey.entity';
import { GetSurvey } from './dto/args/getSurvey.arg';

@Injectable()
export class SurveysService {
  constructor(private surveyRepository: SurveysRepository) {}
  async createSurvey(createSurveyInput: CreateSurveyInput) {
    return await this.surveyRepository.createSurvey(createSurveyInput);
  }

  async findSurveyById(dto: GetSurvey): Promise<Survey> {
    const survey = await this.surveyRepository.findSurveyById(dto.id);

    if (!survey) {
      throw new NotFoundException('survey');
    }

    return survey;
  }

  async findAll(): Promise<Survey[]> {
    const surveys = await this.surveyRepository.findAllSurveys();

    return surveys;
  }

  async updateSurveyById(data: UpdateSurveyInput): Promise<Survey> {
    const result = await this.surveyRepository.updateSurveyById(data);

    if (!result.raw[0]) {
      throw new NotFoundException('survey');
    }

    return result.raw[0];
  }

  async removeSurveyById(id: number): Promise<Survey> {
    const result = await this.surveyRepository.removeSurveyById(id);

    if (!result.raw[0]) throw new NotFoundException('survey');

    return result.raw[0];
  }
}
