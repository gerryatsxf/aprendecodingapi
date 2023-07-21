import { Controller, Get, Query } from '@nestjs/common';
import { FreeSlotService } from './free-slot.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('Free Time Slots')
@Controller('free-slot')
export class FreeSlotController {
  constructor(private readonly freeSlotService: FreeSlotService) {}

  @Get()
  @ApiQuery({
    name: 'guestTimezone',
    required: false,
    type: String,
  }) // Add a Swagger query parameter
  async getFreeSlots(
    @Query('guestTimezone') guestTimezone = 'America/Monterrey',
  ) {

    return this.freeSlotService.getFreeSlots(guestTimezone);
  }
}
