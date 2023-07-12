import { DateTime, IANAZone } from 'luxon';
import { Availability } from '../availability/entities/availability.entity';
import { Injectable } from '@nestjs/common';
import { AvailabilityService } from '../availability/availability.service';
import { NylasFreeBusy } from '../calendar/entities/nylas-free-busy.entity';
import { CalendarService } from '../calendar/calendar.service';

@Injectable()
export class FreeSlotService {
  constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly calendarService: CalendarService,
  ) {}

  async getFreeSlots() {
    const workSlotsResult = this.availabilityService.findWorkSlots();
    const workSlots = workSlotsResult.workSlots;

    const startTime = Math.floor(Date.now() / 1000); // current unix
    const endTime = startTime + 60 * 60 * 24 * 5; // add 5 days in seconds
    const mainEmailAccount = process.env.NYLAS_MAIN_ACCOUNT_EMAIL;
    const nylasFreeBusy: NylasFreeBusy[] =
      await this.calendarService.getFreeBusy(startTime, endTime, [
        mainEmailAccount,
      ]);

    const busySlots = nylasFreeBusy.flatMap((entry) => {
      return entry.timeSlots.map((slot) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));
    });

    const freeSlots = workSlots.filter((workSlot) => {
      // Check if the work slot overlaps with any busy slot
      return !busySlots.some((busySlot) => {
        return (
          (workSlot.startTime >= busySlot.startTime &&
            workSlot.startTime < busySlot.endTime) ||
          (workSlot.endTime > busySlot.startTime &&
            workSlot.endTime <= busySlot.endTime) ||
          (workSlot.startTime <= busySlot.startTime &&
            workSlot.endTime >= busySlot.endTime)
        );
      });
    });

    return {
      localTimezone: workSlotsResult.timezone,
      freeSlots: freeSlots,
    };
  }
}
