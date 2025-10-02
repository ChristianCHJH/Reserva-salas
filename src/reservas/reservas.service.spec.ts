import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { Sala } from '../salas/entities/sala.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

describe('ReservasService', () => {
  let service: ReservasService;

  // Mocks
  const reservaRepo = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
  } as any;

  const salasRepo = {
    findOne: jest.fn(),
  } as any;

  const usuariosRepo = {
    findOne: jest.fn(),
  } as any;

  const makeQb = (exists: boolean) => {
    const qb: any = {
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getExists: jest.fn().mockResolvedValue(exists),
    };
    reservaRepo.createQueryBuilder.mockReturnValue(qb);
    return qb;
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        { provide: getRepositoryToken(Reserva), useValue: reservaRepo },
        { provide: getRepositoryToken(Sala), useValue: salasRepo },
        { provide: getRepositoryToken(Usuario), useValue: usuariosRepo },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
  });

  it('lista reservas con relaciones y orden DESC', async () => {
    const items = [{ id: '2' }, { id: '1' }] as any;
    reservaRepo.find.mockResolvedValue(items);

    const result = await service.findAll();

    expect(reservaRepo.find).toHaveBeenCalledWith({
      order: { id: 'DESC' },
      relations: { sala: true, usuario: true },
    });
    expect(result).toBe(items);
  });

  it('crea una reserva cuando no hay solape', async () => {
    const dto = {
      inicio: '2025-10-02T10:00:00.000Z',
      fin: '2025-10-02T11:00:00.000Z',
      titulo: 'Reunión',
      descripcion: 'Detalle',
      salaId: '1',
      usuarioId: '1',
    };

    const sala: Partial<Sala> = { salaId: '1', nombre: 'A' };
    const usuario: Partial<Usuario> = { usuarioId: '1', nombres: 'John' };
    salasRepo.findOne.mockResolvedValue(sala);
    usuariosRepo.findOne.mockResolvedValue(usuario);
    makeQb(false);

    const created: Partial<Reserva> = { id: undefined };
    const saved: Partial<Reserva> = { id: '123' };
    reservaRepo.create.mockImplementation((arg: any) => ({ ...created, ...arg }));
    reservaRepo.save.mockResolvedValue(saved);


    const result = await service.create(dto as any);


    expect(result).toEqual(saved);
    expect(reservaRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        titulo: 'Reunión',
        descripcion: 'Detalle',
        sala,
        usuario,
        fechaActualizacion: null,
        inicio: new Date(dto.inicio),
        fin: new Date(dto.fin),
      }),
    );
    expect(reservaRepo.save).toHaveBeenCalled();
  });

  it('rechaza creación cuando hay solape en misma sala', async () => {
    const dto = {
      inicio: '2025-10-02T10:00:00.000Z',
      fin: '2025-10-02T11:00:00.000Z',
      titulo: 'Reunión',
      salaId: '1',
      usuarioId: '1',
    };
    salasRepo.findOne.mockResolvedValue({ salaId: '1' });
    usuariosRepo.findOne.mockResolvedValue({ usuarioId: '1' });
    makeQb(true); // sí existe solape

    await expect(service.create(dto as any)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('lanza 404 si la sala no existe', async () => {
    const dto = {
      inicio: '2025-10-02T10:00:00.000Z',
      fin: '2025-10-02T11:00:00.000Z',
      titulo: 'Reunión',
      salaId: '999',
      usuarioId: '1',
    };
    salasRepo.findOne.mockResolvedValue(null);

    await expect(service.create(dto as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('lanza 404 si el usuario no existe', async () => {
    const dto = {
      inicio: '2025-10-02T10:00:00.000Z',
      fin: '2025-10-02T11:00:00.000Z',
      titulo: 'Reunión',
      salaId: '1',
      usuarioId: '999',
    };
    salasRepo.findOne.mockResolvedValue({ salaId: '1' });
    usuariosRepo.findOne.mockResolvedValue(null);

    await expect(service.create(dto as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('rechaza cuando inicio es mayor o igual que fin', async () => {
    const dto = {
      inicio: '2025-10-02T11:00:00.000Z',
      fin: '2025-10-02T10:00:00.000Z',
      titulo: 'Reunión',
      salaId: '1',
      usuarioId: '1',
    };
    salasRepo.findOne.mockResolvedValue({ salaId: '1' });
    usuariosRepo.findOne.mockResolvedValue({ usuarioId: '1' });

    await expect(service.create(dto as any)).rejects.toBeInstanceOf(BadRequestException);
  });
});
