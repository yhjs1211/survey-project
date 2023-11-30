import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}
}
