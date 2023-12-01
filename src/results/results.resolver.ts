import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResultsService } from './results.service';
import { Result } from './entities/result.entity';
import { CreateResultInput } from './inputs/createResult.input';
import { UpdateResultInput } from './inputs/updateResult.input';

@Resolver(() => Result)
export class ResultsResolver {
  constructor(private readonly resultsService: ResultsService) {}

  @Query(() => Result)
  getResult(@Args('id', { type: () => Int }) id: number): Promise<Result> {
    return this.resultsService.findResultById(id);
  }

  @Query(() => [Result])
  getResultsBySurveyId(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<Result[]> {
    return this.resultsService.findResultsBySurveyId(surveyId);
  }

  @Mutation(() => Result)
  createResult(
    @Args('createResultInput') dto: CreateResultInput,
  ): Promise<Result> {
    return this.resultsService.createResult(dto);
  }

  @Mutation(() => Result)
  updateResult(
    @Args('updateResultInput') dto: UpdateResultInput,
  ): Promise<Result> {
    return this.resultsService.updateResult(dto);
  }

  @Mutation(() => Result)
  deleteResult(@Args('id', { type: () => Int }) id: number): Promise<Result> {
    return this.resultsService.deleteResult(id);
  }
}
