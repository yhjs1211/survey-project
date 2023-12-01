import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResultsService } from './results.service';
import { Result } from './entities/result.entity';
import { CreateResultInput } from './dto/inputs/createResult.input';
import { UpdateResultInput } from './dto/inputs/updateResult.input';

@Resolver(() => Result)
export class ResultsResolver {
  constructor(private readonly resultsService: ResultsService) {}

  @Query(() => Result, { name: 'result' })
  getResult(@Args('id', { type: () => Int }) id: number) {
    return this.resultsService.findOne(id);
  }

  @Query(() => [Result], { name: 'results' })
  getAllResults() {
    return this.resultsService.findAll();
  }

  @Query(() => [Result], {
    name: 'resultsBySurveyId',
    description: 'results by survey id',
  })
  getResultsBySurveyId() {
    return this.resultsService.findResultsBySurveyId();
  }

  @Mutation(() => Result)
  createResult(
    @Args('createResultInput') createResultInput: CreateResultInput,
  ) {
    return this.resultsService.create(createResultInput);
  }

  @Mutation(() => Result)
  updateResult(
    @Args('updateResultInput') updateResultInput: UpdateResultInput,
  ) {
    return this.resultsService.update(updateResultInput.id, updateResultInput);
  }

  @Mutation(() => Result)
  removeResult(@Args('id', { type: () => Int }) id: number) {
    return this.resultsService.remove(id);
  }
}
