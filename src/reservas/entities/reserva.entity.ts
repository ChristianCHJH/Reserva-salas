import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sala } from '../../salas/entities/sala.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity({ name: 'reservas', schema: 'reservas' })
export class Reserva {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'timestamptz' })
  inicio!: Date;

  @Column({ type: 'timestamptz' })
  fin!: Date;

  @Column({ type: 'varchar', length: 140 })
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({ name: 'fecha_creacion', type: 'timestamptz' })
  fechaCreacion!: Date;

  @Column({ name: 'fecha_actualizacion', type: 'timestamptz', nullable: true })
  fechaActualizacion!: Date | null;

  @ManyToOne(() => Sala, (s) => s.reservas, { nullable: false })
  @JoinColumn({ name: 'sala_id' })
  sala!: Sala;

  @ManyToOne(() => Usuario, (u) => u.reservas, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;
}
