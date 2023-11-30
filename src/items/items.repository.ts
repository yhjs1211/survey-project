import { Question } from 'src/questions/entities/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { GetItem } from './dto/args/getItem.arg';
import { ItemInput } from './dto/inputs/Item.input';

@Injectable()
export class ItemsRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  findItemByIds(surveyId: number, questionId: number): Promise<Item> {
    try {
      return this.itemRepository.findOne({
        where: { surveyId, questionId },
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
        relations: { question: true, survey: true },
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

  createItem(input: ItemInput) {
    try {
      const item = this.itemRepository.create(input);

      return this.itemRepository.save(item);
    } catch (error) {
      console.log(error);
    }
  }

  updateItem(input: ItemInput, item: Item): Promise<Item> {
    try {
      item.choice = input.choice;
      return this.itemRepository.save(item);
    } catch (error) {
      console.log(error);
    }
  }

  deleteItem(surveyId: number, questionId: number): Promise<DeleteResult> {
    try {
      return this.dataSource
        .createQueryBuilder()
        .delete()
        .from(Item)
        .where({ surveyId, questionId })
        .returning('*')
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
