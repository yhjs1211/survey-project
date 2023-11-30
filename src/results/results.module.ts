import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsResolver } from './results.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ResultsRepository } from './results.repository';

@Module({
  providers: [ResultsResolver, ResultsService, ResultsRepository],
  imports: [TypeOrmModule.forFeature([Result])],
})
export class ResultsModule {}
