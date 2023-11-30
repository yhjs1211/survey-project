import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { ItemInput } from './dto/inputs/Item.input';
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

  @Mutation(() => Item, { name: 'upsertItemByIds' })
  upsertItem(@Args('itemInput') itemInput: ItemInput): Promise<Item> {
    return this.itemsService.upsertItem(itemInput);
  }

  @Mutation(() => Item)
  deleteItem(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<Item> {
    return this.itemsService.removeItem(surveyId, questionId);
  }
}
