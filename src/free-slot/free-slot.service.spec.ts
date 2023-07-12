import { Test, TestingModule } from '@nestjs/testing';
import { FreeSlotService } from './free-slot.service';

describe('FreeSlotService', () => {
  let service: FreeSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeSlotService],
    }).compile();

    service = module.get<FreeSlotService>(FreeSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
