import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysResolver } from './surveys.resolver';
import { SurveysRepository } from './surveys.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';

@Module({
  providers: [SurveysResolver, SurveysService, SurveysRepository],
  imports: [TypeOrmModule.forFeature([Survey])],
})
export class SurveysModule {}
