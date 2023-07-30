import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FreeSlotService } from './free-slot.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SessionInfo } from '../session/decorators/session-info.decorator';
import { SessionService } from '../session/session.service';
import { UpdateSessionDto } from '../session/dto/update-session.dto';
@ApiTags('Free Time Slots')
@Controller('free-slot')
export class FreeSlotController {
  constructor(
    private readonly freeSlotService: FreeSlotService,
    private readonly sessionService: SessionService,
  ) {}
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
    @SessionInfo() sessionInfo,
  ) {
    const updated = new UpdateSessionDto();
    updated.timezone = guestTimezone;
    await this.sessionService.update(sessionInfo.id, updated);
    return this.freeSlotService.getFreeSlots(guestTimezone);
  }
}
