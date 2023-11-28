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
  async getSurvey(@Args() getSurveyDTO: GetSurvey) {
    const survey = await this.surveysService.findOne(getSurveyDTO.id);
    return survey;
  }

  @Query(() => [Survey], { name: 'surveys' })
  getAllSurveys() {
    return this.surveysService.findAll();
  }

  @Mutation(() => Survey)
  createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ) {
    return this.surveysService.createSurvey(createSurveyInput);
  }

  @Mutation(() => Survey)
  updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    return this.surveysService.update(updateSurveyInput.id, updateSurveyInput);
  }

  @Mutation(() => Survey)
  deleteSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveysService.remove(id);
  }
}
