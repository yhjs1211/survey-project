import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateResultInput } from './inputs/createResult.input';
import { UpdateResultInput } from './inputs/updateResult.input';
import { ResultsRepository } from './results.repository';
import { Result } from './entities/result.entity';
import { SurveysRepository } from 'src/surveys/surveys.repository';
import { Choice } from './entities/types/result.choice';
import { Survey } from 'src/surveys/entities/survey.entity';

@Injectable()
export class ResultsService {
  constructor(
    private readonly resultRepository: ResultsRepository,
    private readonly surveyRepository: SurveysRepository,
  ) {}

  async findResultById(id: number): Promise<Result> {
    const result = await this.resultRepository.findResultById(id);

    return result;
  }

  async findResultsBySurveyId(surveyId: number): Promise<Result[]> {
    const survey = await this.surveyRepository.findSurveyById(surveyId);
    if (!survey)
      throw new BadRequestException(`There is no survey by${surveyId}`);

    const results = await this.resultRepository.findResultsBySurveyId(surveyId);

    return results;
  }

  async createResult(dto: CreateResultInput): Promise<Result> {
    const survey = await this.surveyRepository.findSurveyById(dto.surveyId);
    if (!survey) throw new NotFoundException('survey');

    dto.totalScore = this.validateData(dto.choice, survey);

    const result = await this.resultRepository.upsertResult(dto);

    return result;
  }

  async updateResult(dto: UpdateResultInput): Promise<Result> {
    const result = await this.resultRepository.findResultById(dto.id);

    result.totalScore = this.validateData(dto.choice, result.survey);
    result.choice = dto.choice;

    return await this.resultRepository.upsertResult(result);
  }

  async deleteResult(id: number): Promise<Result> {
    const result = await this.resultRepository.deleteResult(id);
    return result.raw[0];
  }

  validateData(data: Choice, survey: Survey): number {
    let total = 0;

    Object.entries(data).forEach((answer) => {
      // 입력 데이터 타입 체크 및 유효성 검사
      if (typeof answer[1][1] !== 'number' || !Number(answer[1][0]))
        throw new BadRequestException('Please send correct Data type');

      // Survey에 속한 문항 여부 체크
      if (!survey.sequence.includes(Number(answer[0])))
        throw new BadRequestException(
          `There is no Question in survey about ${Number(
            answer[0],
          )} as question ID.`,
        );

      total += answer[1][1];
    });

    return total;
  }
}
