import { Test, TestingModule } from '@nestjs/testing';
import { CitiesRepository } from '../cities.repository';

describe('CitiesService', () => {
  let service: CitiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesRepository],
    }).compile();

    service = module.get<CitiesRepository>(CitiesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
