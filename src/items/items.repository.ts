import { Question } from 'src/questions/entities/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { GetItem } from './dto/args/getItem.arg';
import { CreateItemInput } from './dto/inputs/createItem.input';

@Injectable()
export class ItemsRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  findItemByIds(dto: GetItem): Promise<Item> {
    try {
      return this.itemRepository.findOne({
        where: { surveyId: dto.surveyId, questionId: dto.questionId },
        relations: { question: true },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findItemsBySurveyId(id: number): Promise<Item[]> {
    try {
      return this.itemRepository.find({
        where: { surveyId: id },
        relations: { question: true },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findItemsByQuestionId(id: number): Promise<Item[]> {
    try {
      return this.itemRepository.find({
        where: { questionId: id },
        relations: { survey: true },
      });
    } catch (error) {
      console.log(error);
    }
  }

  createItem(data: CreateItemInput): Promise<Item> {
    try {
      const item = this.itemRepository.create(data);

      return this.itemRepository.save(item);
    } catch (error) {
      console.log(error);
    }
  }
}
