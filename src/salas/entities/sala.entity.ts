import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity({ name: 'salas', schema: 'reservas' })
export class Sala {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  salaId!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ name: 'color', type: 'varchar', length: 30 })
  color!: string;

  @Column({ name: 'activa', type: 'boolean' })
  activa!: boolean;

  @Column({ name: 'fecha_creacion', type: 'timestamptz' })
  fechaCreacion!: Date;

  @Column({ name: 'fecha_actualizacion', type: 'timestamptz', nullable: true })
  fechaActualizacion!: Date | null;

  @OneToMany(() => Reserva, (r) => r.sala)
  reservas!: Reserva[];
}
