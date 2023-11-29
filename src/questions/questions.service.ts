import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionInput } from './dto/inputs/createQuestion.input';
import { UpdateQuestionInput } from './dto/inputs/updateQuestion.input';
import { QuestionsRepository } from './questions.repository';
import { Question } from './entities/question.entity';
import { GetQuestion } from './dto/args/getQuestion.arg';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionsRepository) {}
  async createQuestion(
    createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    return await this.questionRepository.createQuestion(createQuestionInput);
  }

  async findAllQuestions(): Promise<Question[]> {
    return await this.questionRepository.findAllQuestions();
  }

  async findOneQuestionById(getQuestionDTO: GetQuestion): Promise<Question> {
    const question = await this.questionRepository.findQuestionById(
      getQuestionDTO.id,
    );

    // if(!question) throw new NotFoundException();

    return question;
  }

  async updateQuestion(
    updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    if (!updateQuestionInput.id || !updateQuestionInput.content) {
      // Error handling
    } else {
      const updatedQuestion = await this.questionRepository.updateQuestion(
        updateQuestionInput.id,
        updateQuestionInput.content,
      );

      // if(!updatedQuestion.affected) throw new NotFoundException()

      return updatedQuestion.raw[0];
    }
  }

  async deleteQuestion(id: number): Promise<Question> {
    const deletedQuestion = await this.questionRepository.deleteQuestion(id);

    // if(!deletedQuestion.affected) throw new NotFoundException();

    return deletedQuestion.raw[0];
  }
}
