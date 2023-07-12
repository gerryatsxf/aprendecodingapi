import { Test, TestingModule } from '@nestjs/testing';
import { FreeSlotController } from './free-slot.controller';
import { FreeSlotService } from './free-slot.service';

describe('FreeSlotController', () => {
  let controller: FreeSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreeSlotController],
      providers: [FreeSlotService],
    }).compile();

    controller = module.get<FreeSlotController>(FreeSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
