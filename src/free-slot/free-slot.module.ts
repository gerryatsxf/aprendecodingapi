import { Module } from '@nestjs/common';
import { FreeSlotService } from './free-slot.service';
import { FreeSlotController } from './free-slot.controller';
import { AvailabilityService } from '../availability/availability.service';
import { CalendarService } from '../calendar/calendar.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [SessionModule],
  controllers: [FreeSlotController],
  providers: [FreeSlotService, AvailabilityService, CalendarService],
})
export class FreeSlotModule {}
