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
    if (!dto.questionId || !dto.surveyId) throw new BadRequestException();

    const item = await this.itemRepository.findItemByIds(
      dto.surveyId,
      dto.questionId,
    );

    if (!item) throw new NotFoundException('item');

    return item;
  }

  async findItemsByQuestionId(dto: GetItems): Promise<Item[]> {
    if (!dto.questionId) throw new BadRequestException();

    const items = await this.itemRepository.findItemsByQuestionId(
      dto.questionId,
    );

    if (items.length === 0) throw new NotFoundException('items by question ID');

    return items;
  }

  async upsertItem(input: ItemInput): Promise<Item> {
    // Key 유효성 검사
    if (input.questionId && input.surveyId) {
      Object.entries(input.choice).forEach((arr) => {
        if (!parseInt(arr[0]))
          throw new BadRequestException(
            'Please input numeric string data type.',
          );
      });
    } else if (!input.questionId || !input.surveyId) {
      throw new BadRequestException(
        "Please check to input correct ID's in query variables",
      );
    }

    const item = await this.itemRepository.findItemByIds(
      input.surveyId,
      input.questionId,
    );

    if (item) {
      // input 값 item 내에 존재하는지 확인하는 로직 추가
      return await this.itemRepository.updateItem(input, item);
    } else {
      const survey = await this.surveyRepository.findSurveyById(input.surveyId);
      const question = await this.questionRepository.findQuestionById(
        input.questionId,
      );

      if (!survey || !question) {
        if (!survey) {
          throw new NotFoundException('survey');
        } else {
          throw new NotFoundException('question');
        }
      }
      survey.sequence.push(question.id);
      this.surveyRepository.updateSequence(survey.id, survey.sequence);

      return await this.itemRepository.createItem(input);
    }
  }

  async deleteItem(sId: number, qId: number): Promise<Item> {
    const item = await this.itemRepository.findItemByIds(sId, qId);

    if (!item) throw new NotFoundException('item');

    const survey = await this.surveyRepository.findSurveyById(sId);

    const arr = survey.sequence;
    arr.splice(arr.indexOf(qId), 1);
    this.surveyRepository.updateSequence(sId, arr);

    const deletedItem = await this.itemRepository.deleteItem(sId, qId);

    return deletedItem.raw[0];
  }
}
