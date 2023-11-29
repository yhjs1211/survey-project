import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionsRepository } from './questions.repository';

@Module({
  providers: [QuestionsResolver, QuestionsService, QuestionsRepository],
  imports: [TypeOrmModule.forFeature([Question])],
  exports: [QuestionsRepository],
})
export class QuestionsModule {}
