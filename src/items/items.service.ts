import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemInput } from './dto/inputs/Item.input';
import { GetItem } from './dto/args/getItem.arg';
import { Item } from './entities/item.entity';
import { ItemsRepository } from './items.repository';
import { GetItems } from './dto/args/getItems.arg';
import { SurveysRepository } from 'src/surveys/surveys.repository';
import { QuestionsRepository } from 'src/questions/questions.repository';

@Injectable()
export class ItemsService {
  constructor(
    private readonly itemRepository: ItemsRepository,
    private readonly surveyRepository: SurveysRepository,
    private readonly questionRepository: QuestionsRepository,
  ) {}
  async findItemByIds(dto: GetItem): Promise<Item> {
    const item = await this.itemRepository.findItemByIds(
      dto.surveyId,
      dto.questionId,
    );

    if (!item) throw new NotFoundException();

    return item;
  }

  async findItemsBySurveyId(dto: GetItems): Promise<Item[]> {
    const items = await this.itemRepository.findItemsBySurveyId(dto.surveyId);

    if (!items) throw new NotFoundException();

    return items;
  }

  async findItemsByQuestionId(dto: GetItems): Promise<Item[]> {
    const items = await this.itemRepository.findItemsByQuestionId(
      dto.questionId,
    );

    if (!items) throw new NotFoundException();

    return items;
  }

  async upsertItem(input: ItemInput): Promise<Item> {
    // Key 유효성 검사
    Object.entries(input.choice).forEach((arr) => {
      if (!parseInt(arr[0])) throw new BadRequestException();
    });

    const item = await this.itemRepository.findItemByIds(
      input.surveyId,
      input.questionId,
    );

    if (item) {
      return await this.itemRepository.updateItem(input, item);
    } else {
      const survey = await this.surveyRepository.findSurveyById(input.surveyId);
      const question = await this.questionRepository.findQuestionById(
        input.questionId,
      );

      if (!survey || !question) {
        if (!survey) {
          throw new NotFoundException(
            'There is no survey.. Please try again another survey ID',
          );
        } else {
          throw new NotFoundException(
            'There is no survey.. Please try again another question ID',
          );
        }
      }
      return await this.itemRepository.createItem(input);
    }
  }

  async removeItem(sId: number, qId: number): Promise<Item> {
    const deletedItem = await this.itemRepository.removeItem(sId, qId);

    if (!deletedItem.affected) throw new NotFoundException();

    return deletedItem.raw[0];
  }
}
