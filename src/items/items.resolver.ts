import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/inputs/createItem.input';
import { UpdateItemInput } from './dto/inputs/updateItem.input';
import { GetItem } from './dto/args/getItem.arg';
import { GetItems } from './dto/args/getItems.arg';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => Item, { name: 'item' })
  findItemByIds(@Args() getItemDTO: GetItem): Promise<Item> {
    return this.itemsService.findItemByIds(getItemDTO);
  }

  @Query(() => [Item], { name: 'itemsBySurveyId' })
  findItemsBySurveyId(@Args() getItemsDTO: GetItems): Promise<Item[]> {
    return this.itemsService.findItemsBySurveyId(getItemsDTO);
  }

  @Query(() => [Item], { name: 'itemsByQuestionId' })
  findItemsByQuestionId(@Args() getItemsDTO: GetItems): Promise<Item[]> {
    return this.itemsService.findItemsByQuestionId(getItemsDTO);
  }

  @Mutation(() => Item)
  createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
  ): Promise<Item> {
    return this.itemsService.createItem(createItemInput);
  }

  // @Mutation(() => Item)
  // updateItem(
  //   @Args('updateItemInput') updateItemInput: UpdateItemInput,
  // ): Promise<Item> {
  //   return this.itemsService.update(updateItemInput.id, updateItemInput);
  // }

  // @Mutation(() => Item)
  // removeItem(@Args('id', { type: () => Int }) id: number): Promise<Item> {
  //   return this.itemsService.remove(id);
  // }
}
