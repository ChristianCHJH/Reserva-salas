import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Sala } from '../salas/entities/sala.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly repo: Repository<Reserva>,
    @InjectRepository(Sala)
    private readonly salasRepo: Repository<Sala>,
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {}

  findAll(): Promise<Reserva[]> {
    return this.repo.find({
      order: { id: 'DESC' },
      relations: { sala: true, usuario: true },
    });
  }

  async create(dto: CreateReservaDto): Promise<Reserva> {
    const inicio = new Date(dto.inicio);
    const fin = new Date(dto.fin);

    if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
      throw new BadRequestException('Fechas inválidas');
    }
    if (inicio >= fin) {
      throw new BadRequestException('La fecha de inicio debe ser menor que la de fin');
    }

    const sala = await this.salasRepo.findOne({ where: { salaId: dto.salaId } });
    if (!sala) throw new NotFoundException('Sala no encontrada');

    const usuario = await this.usuariosRepo.findOne({ where: { usuarioId: dto.usuarioId } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const overlaps = await this.repo
      .createQueryBuilder('r')
      .innerJoin('r.sala', 's')
      .where('s.id = :salaId', { salaId: dto.salaId })
      .andWhere('NOT (r.fin <= :inicio OR r.inicio >= :fin)', { inicio, fin })
      .getExists();

    if (overlaps) {
      throw new BadRequestException('La sala ya está reservada en el horario solicitado');
    }

    const entity = this.repo.create({
      inicio,
      fin,
      titulo: dto.titulo,
      descripcion: dto.descripcion ?? null,
      fechaCreacion: new Date(),
      fechaActualizacion: null,
      sala,
      usuario,
    });

    return this.repo.save(entity);
  }
}
