import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FreeSlotService } from './free-slot.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiTags('Free Time Slots')
@Controller('free-slot')
export class FreeSlotController {
  constructor(private readonly freeSlotService: FreeSlotService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({
    name: 'guestTimezone',
    required: false,
    type: String,
    description: 'The timezone of the guest. Defaults to America/Monterrey.',
  }) // Add a Swagger query parameter
  @ApiBearerAuth()
  async getFreeSlots(
    @Query('guestTimezone') guestTimezone = 'America/Monterrey',
  ) {
    return this.freeSlotService.getFreeSlots(guestTimezone);
  }
}
