import { ArgsType, PartialType, PickType } from '@nestjs/graphql';
import { GetItem } from './getItem.arg';

@ArgsType()
export class GetItems extends PickType(GetItem, ['questionId'] as const) {}
