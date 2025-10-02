export class CreateReservaDto {
  inicio!: string;
  fin!: string;
  titulo!: string;
  descripcion?: string | null;
  salaId!: string;
  usuarioId!: string;
}

