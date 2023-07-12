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
    const startTime = Math.floor(Date.now() / 1000); // current unix
    const endTime = startTime + 60 * 60 * 24 * 5; // add 5 days in seconds
    const mainEmailAccount = process.env.NYLAS_MAIN_ACCOUNT_EMAIL;
    const nylasFreeBusy: NylasFreeBusy[] =
      await this.calendarService.getFreeBusy(startTime, endTime, [
        mainEmailAccount,
      ]);
    const availability: Availability = this.availabilityService.findCurrent();

    const availabilityDays = availability.days.map((day) => day.toLowerCase());
    const availabilityStartTime = this.getTimeInMinutes(availability.startTime);
    const availabilityEndTime = this.getTimeInMinutes(availability.endTime);

    const freeSlots = [];
    for (
      let time = availabilityStartTime;
      time < availabilityEndTime;
      time += 60
    ) {
      const day = this.getDayName(new Date(time * 1000));
      if (!availabilityDays.includes(day)) continue;

      const isFree = nylasFreeBusy.every((entry) => {
        return entry.timeSlots.every((slot) => {
          const slotStartTimeDate = new Date(slot.startTime * 1000);
          const slotEndTimeDate = new Date(slot.endTime * 1000);
          const slotStartTime =
            (slot.startTime * 1000 +
              slotStartTimeDate.getTimezoneOffset() * 60) %
            1440;
          const slotEndTime =
            (slot.endTime * 1000 + slotEndTimeDate.getTimezoneOffset() * 60) %
            1440;
          return time < slotStartTime || time + 60 > slotEndTime;
        });
      });

      if (isFree) {
        freeSlots.push({
          startTime: new Date(time * 1000),
          endTime: new Date((time + 60) * 1000),
        });
      }
    }

    return freeSlots;
  }

  getDayName(date: Date): string {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return days[date.getUTCDay()];
  }

  getTimeInMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
