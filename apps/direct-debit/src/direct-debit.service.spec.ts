import { Test, TestingModule } from '@nestjs/testing';
import { DirectDebitService } from './direct-debit.service';

describe('DirectDebitService', () => {
  let service: DirectDebitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectDebitService],
    }).compile();

    service = module.get<DirectDebitService>(DirectDebitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
