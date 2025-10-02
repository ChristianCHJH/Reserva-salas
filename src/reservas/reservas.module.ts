import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { Sala } from '../salas/entities/sala.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Sala, Usuario])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
