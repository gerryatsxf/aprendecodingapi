import { Controller, Get } from '@nestjs/common';
import { FreeSlotService } from './free-slot.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Free Time Slots')
@Controller('free-slot')
export class FreeSlotController {
  constructor(private readonly freeSlotService: FreeSlotService) {}

  @Get()
  async getFreeSlots() {
    return this.freeSlotService.getFreeSlots();
  }
}
