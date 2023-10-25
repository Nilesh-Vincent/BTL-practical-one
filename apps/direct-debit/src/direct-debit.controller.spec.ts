import { Test, TestingModule } from '@nestjs/testing';
import { DirectDebitController } from './direct-debit.controller';
import { DirectDebitService } from './direct-debit.service';

describe('DirectDebitController', () => {
  let controller: DirectDebitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectDebitController],
      providers: [DirectDebitService],
    }).compile();

    controller = module.get<DirectDebitController>(DirectDebitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
