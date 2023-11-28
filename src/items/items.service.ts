import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/inputs/createItem.input';
import { UpdateItemInput } from './dto/inputs/updateItem.input';

@Injectable()
export class ItemsService {
  create(createItemInput: CreateItemInput) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
