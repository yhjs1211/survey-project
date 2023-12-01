import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { ItemInput } from './dto/inputs/Item.input';
import { GetItem } from './dto/args/getItem.arg';
import { GetItems } from './dto/args/getItems.arg';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => Item)
  getItemByIds(@Args() getItemDTO: GetItem): Promise<Item> {
    return this.itemsService.findItemByIds(getItemDTO);
  }

  // getSurvey 에서 JOIN 처리와 동일
  // @Query(() => [Item])
  // getItemsBySurveyId(@Args() getItemsDTO: GetItems): Promise<Item[]> {
  //   return this.itemsService.findItemsBySurveyId(getItemsDTO);
  // }

  @Query(() => [Item])
  getItemsByQuestionId(@Args() getItemsDTO: GetItems): Promise<Item[]> {
    return this.itemsService.findItemsByQuestionId(getItemsDTO);
  }

  @Mutation(() => Item)
  upsertItemByIds(@Args('itemInput') itemInput: ItemInput): Promise<Item> {
    return this.itemsService.upsertItem(itemInput);
  }

  @Mutation(() => Item)
  deleteItem(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<Item> {
    return this.itemsService.deleteItem(surveyId, questionId);
  }
}
