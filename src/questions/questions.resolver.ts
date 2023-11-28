import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/inputs/createQuestion.input';
import { UpdateQuestionInput } from './dto/inputs/updateQuestion.input';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Query(() => Question, { name: 'question' })
  getQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.findOne(id);
  }

  @Query(() => [Question], { name: 'questions' })
  getAllQuestions() {
    return this.questionsService.findAll();
  }

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionsService.create(createQuestionInput);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionsService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => Question)
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.remove(id);
  }
}
