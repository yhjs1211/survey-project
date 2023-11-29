import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsRepository } from './items.repository';
import { SurveysModule } from 'src/surveys/surveys.module';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  providers: [ItemsResolver, ItemsService, ItemsRepository],
  imports: [TypeOrmModule.forFeature([Item]), SurveysModule, QuestionsModule],
})
export class ItemsModule {}
