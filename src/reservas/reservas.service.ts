import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly repo: Repository<Reserva>,
  ) {}

  findAll(): Promise<Reserva[]> {
    return this.repo.find({
      order: { id: 'DESC' },
      relations: { sala: true, usuario: true },
    });
  }
}
