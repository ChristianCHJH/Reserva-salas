import { Controller, Get } from '@nestjs/common';
import { SalasService } from './salas.service';
import { Sala } from './entities/sala.entity';

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Get()
  findAll(): Promise<Sala[]> {
    return this.salasService.findAll();
  }
}
