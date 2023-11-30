import { Injectable } from '@nestjs/common';
import { CreateResultInput } from './dto/inputs/createResult.input';
import { UpdateResultInput } from './dto/inputs/updateResult.input';
import { ResultsRepository } from './results.repository';

@Injectable()
export class ResultsService {
  constructor(private readonly resultRepository: ResultsRepository) {}

  create(createResultInput: CreateResultInput) {
    return 'This action adds a new result';
  }

  findAll() {
    return `This action returns all results`;
  }

  findResultsBySurveyId() {
    return 'hello';
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultInput: UpdateResultInput) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
