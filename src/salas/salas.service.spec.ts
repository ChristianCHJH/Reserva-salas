import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalasService } from './salas.service';
import { Sala } from './entities/sala.entity';

describe('SalasService', () => {
  let service: SalasService;
  const repo = {
    find: jest.fn(),
  } as unknown as jest.Mocked<Repository<Sala>>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalasService,
        { provide: getRepositoryToken(Sala), useValue: repo },
      ],
    }).compile();

    service = module.get(SalasService);
  });

  it('lista salas ordenadas por salaId ASC', async () => {
    const items = [{ salaId: '1' }, { salaId: '2' }] as any;
    (repo.find as any).mockResolvedValue(items);

    const result = await service.findAll();

    expect(repo.find).toHaveBeenCalledWith({ order: { salaId: 'ASC' } });
    expect(result).toBe(items);
  });
});

