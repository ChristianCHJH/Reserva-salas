import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly repo: Repository<Sala>,
  ) {}

  findAll(): Promise<Sala[]> {
    return this.repo.find({ order: { salaId: 'ASC' } });
  }
}
