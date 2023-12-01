import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsResolver } from './results.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ResultsRepository } from './results.repository';
import { SurveysModule } from 'src/surveys/surveys.module';

@Module({
  providers: [ResultsResolver, ResultsService, ResultsRepository],
  imports: [TypeOrmModule.forFeature([Result]), SurveysModule],
})
export class ResultsModule {}
