import { Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/inputs/createQuestion.input';
import { UpdateQuestionInput } from './dto/inputs/updateQuestion.input';

@Injectable()
export class QuestionsService {
  create(createQuestionInput: CreateQuestionInput) {
    return 'This action adds a new question';
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
