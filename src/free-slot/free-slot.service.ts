import { Injectable } from '@nestjs/common';
import { Availability } from '../availability/entities/availability.entity';
import { NylasFreeBusy } from '../calendar/entities/nylas-free-busy.entity';
import { AvailabilityService } from '../availability/availability.service';
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

    console.log(nylasFreeBusy);
    const freeSlots = nylasFreeBusy.flatMap((entry) => {
      console.log(entry);
      return entry.timeSlots
        .map((slot) => ({
          startTime: new Date(slot.startTime * 1000), // Convert Unix timestamp to JS Date object
          endTime: new Date(slot.endTime * 1000),
        }))
        .filter((slot) => {
          const day = this.getDayName(slot.startTime);
          const startTime =
            slot.startTime.getUTCHours() * 60 + slot.startTime.getUTCMinutes();
          const endTime =
            slot.endTime.getUTCHours() * 60 + slot.endTime.getUTCMinutes();

          // Check if the day, start time, and end time match the availability
          console.log({day, availabilityStartTime, availabilityEndTime, startTime, endTime});
          return (
            availabilityDays.includes(day) &&
            startTime >= availabilityStartTime &&
            endTime <= availabilityEndTime
          );
        });
    });

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
