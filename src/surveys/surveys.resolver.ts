import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveysService } from './surveys.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/inputs/createSurvey.input';
import { UpdateSurveyInput } from './dto/inputs/updateSurvey.input';
import { GetSurvey } from './dto/args/getSurvey.arg';

@Resolver(() => Survey)
export class SurveysResolver {
  constructor(private readonly surveysService: SurveysService) {}

  @Query(() => Survey, { name: 'survey', description: 'get survey by id' })
  getSurvey(@Args() getSurveyDTO: GetSurvey): Promise<Survey> {
    return this.surveysService.findSurveyById(getSurveyDTO);
  }

  @Query(() => [Survey], { name: 'surveys' })
  getAllSurveys(): Promise<Survey[]> {
    return this.surveysService.findAll();
  }

  @Mutation(() => Survey)
  createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ): Promise<Survey> {
    return this.surveysService.createSurvey(createSurveyInput);
  }

  @Mutation(() => Survey)
  updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ): Promise<Survey> {
    return this.surveysService.updateSurveyById(updateSurveyInput);
  }

  @Mutation(() => Survey)
  deleteSurvey(@Args('id', { type: () => Int }) id: number): Promise<Survey> {
    return this.surveysService.removeSurveyById(id);
  }
}
