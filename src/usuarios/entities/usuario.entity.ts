import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity({ name: 'usuarios', schema: 'reservas' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  usuarioId!: string;

  @Column({ type: 'varchar', length: 100 })
  nombres!: string;

  @Column({ type: 'varchar', length: 120 })
  apellidos!: string;

  @Column({ type: 'varchar', length: 255 })
  correo!: string;

  @Column({ name: 'nombre_usuario', type: 'varchar', length: 50 })
  nombreUsuario!: string;

  @Column({ type: 'boolean' })
  activo!: boolean;

  @Column({ name: 'fecha_creacion', type: 'timestamptz' })
  fechaCreacion!: Date;

  @Column({ name: 'fecha_actualizacion', type: 'timestamptz', nullable: true })
  fechaActualizacion!: Date | null;

  @OneToMany(() => Reserva, (r) => r.usuario)
  reservas!: Reserva[];
}
