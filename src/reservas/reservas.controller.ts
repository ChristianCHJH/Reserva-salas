import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservasService.findAll();
  }

  @Post()
  create(@Body() dto: CreateReservaDto): Promise<Reserva> {
    return this.reservasService.create(dto);
  }
}
