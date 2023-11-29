import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/inputs/createQuestion.input';
import { UpdateQuestionInput } from './dto/inputs/updateQuestion.input';
import { GetQuestion } from './dto/args/getQuestion.arg';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Query(() => Question, { name: 'question' })
  getQuestion(@Args() getQuestionDTO: GetQuestion): Promise<Question> {
    return this.questionsService.findOneQuestionById(getQuestionDTO);
  }

  @Query(() => [Question], { name: 'questions' })
  getAllQuestions(): Promise<Question[]> {
    return this.questionsService.findAllQuestions();
  }

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionsService.createQuestion(createQuestionInput);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionsService.updateQuestion(updateQuestionInput);
  }

  @Mutation(() => Question)
  deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question> {
    return this.questionsService.deleteQuestion(id);
  }
}
