import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/inputs/createItem.input';
import { UpdateItemInput } from './dto/inputs/updateItem.input';
import { GetItem } from './dto/args/getItem.arg';
import { Item } from './entities/item.entity';
import { ItemsRepository } from './items.repository';
import { GetItems } from './dto/args/getItems.arg';

@Injectable()
export class ItemsService {
  constructor(private itemRepository: ItemsRepository) {}
  async findItemByIds(dto: GetItem): Promise<Item> {
    const item = await this.itemRepository.findItemByIds(dto);

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

  async createItem(createItemInput: CreateItemInput): Promise<Item> {
    const item = await this.itemRepository.createItem(createItemInput);

    console.log('created=>', item);

    // if (!item) throw new NotFoundException();

    return item;
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
