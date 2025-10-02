import { Controller, Get } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservasService.findAll();
  }
}
