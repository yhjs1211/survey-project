import { ArgsType, PartialType } from '@nestjs/graphql';
import { GetItem } from './getItem.arg';

@ArgsType()
export class GetItems extends PartialType(GetItem) {}
