import { Injectable } from '@nestjs/common';
import { AvailabilityService } from '../availability/availability.service';
import { NylasFreeBusy } from '../calendar/entities/nylas-free-busy.entity';
import { CalendarService } from '../calendar/calendar.service';
import BusySlotDto from './dto/busy-slot.dto';
import { GuestFreeSlotDto } from '../availability/dto/guest-free-slot.dto';
import FreeSlotDto from '../availability/dto/free-slot.dto';
import { plainToClass } from 'class-transformer';
import { WorkSlotDto } from '../availability/dto/work-slot.dto';
import { DateTimeService } from "../date-time/date-time.service";

function getTimezoneOffset(timezone: string): number {
  const stdTimezoneOffset = (date: Date): number => {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };

  const today = new Date();

  const isDstObserved = (date: Date): boolean => {
    return date.getTimezoneOffset() < stdTimezoneOffset(date);
  };

  const timezoneDate = new Date().toLocaleString('en-US', {
    timeZone: timezone,
  });

  const dateInTimezone = new Date(timezoneDate);

  if (isDstObserved(dateInTimezone)) {
    return dateInTimezone.getTimezoneOffset() / -60; // DST is observed
  } else {
    return dateInTimezone.getTimezoneOffset() / -60 - 1; // DST is not observed
  }
}

@Injectable()
export class FreeSlotService {
  constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly calendarService: CalendarService,
    private readonly dateTimeService: DateTimeService,
  ) {}

  async getFreeSlots(guestTimezone = 'America/Monterrey') {
    console.log({ guestTimezone });
    const workSlotsResult = this.availabilityService.findWorkSlots();

    const workSlots = workSlotsResult.workSlots;

    const startTime = Math.floor(Date.now() / 1000);
    const endTime = startTime + 60 * 60 * 24 * 5; // add 5 days in seconds
    const mainEmailAccount = process.env.NYLAS_MAIN_ACCOUNT_EMAIL;

    const busySlots: BusySlotDto[] = await this.calendarService
      .getFreeBusy(startTime, endTime, [mainEmailAccount])
      .then((entries: NylasFreeBusy[]) => {
        return entries.flatMap((entry) => {
          return entry.timeSlots.map((slot) =>
            plainToClass(BusySlotDto, {
              startTime: slot.startTime,
              endTime: slot.endTime,
            }),
          );
        });
      });

    const freeSlots: FreeSlotDto[] = workSlots.filter(
      (workSlot: WorkSlotDto) => {
        // return true if the work slot does not overlap with any busy slot
        return busySlots.some((busySlot) => {
          return (
            workSlot.endTime <= busySlot.startTime || // if work slot ends before busy slot starts
            workSlot.startTime >= busySlot.endTime // if work slot starts after busy slot ends
          );
        });
      },
    );

    // Convert the free slots to the guest timezone
    //const guestTimezoneObj = guestTimezone;
    const guestFreeSlots: GuestFreeSlotDto[] = freeSlots.map(
      (slot: FreeSlotDto) => {
        const hostStartDateTime = slot.startDateTime;
        console.log(slot)

        console.log({
          hostStartDateTime: hostStartDateTime.toISOString().replace('Z', ''),
        });

        console.log(
          hostStartDateTime.toLocaleString('es-ES', {
            year: 'numeric',
            timeZone: guestTimezone,
          }),
        );

        const guestStartYear = hostStartDateTime.toLocaleString('es-ES', {
          year: 'numeric',
          timeZone: guestTimezone,
        });
        const guestStartMonth = hostStartDateTime.toLocaleString('es-ES', {
          month: '2-digit',
          timeZone: guestTimezone,
        });
        const guestStartDay = hostStartDateTime.toLocaleString('es-ES', {
          day: '2-digit',
          timeZone: guestTimezone,
        });
        const guestStartHour = this.prependZero(
          +hostStartDateTime.toLocaleString('es-ES', {
            hour: 'numeric',
            timeZone: guestTimezone,
          }),
        );

        const guestStartMinute = this.prependZero(
          +hostStartDateTime.toLocaleString('es-ES', {
            minute: 'numeric',
            timeZone: guestTimezone,
          }),
        );

        const guestSlot = new GuestFreeSlotDto();
        guestSlot.startTime = slot.startTime;

        guestSlot.guestStartTime = `${guestStartHour}:${guestStartMinute}`;
        guestSlot.guestDate = `${guestStartYear}-${guestStartMonth}-${guestStartDay}`;
        guestSlot.guestDay = this.formatGuestDay(
          hostStartDateTime,
          guestTimezone,
        );
        return guestSlot;
      },
    );

    return {
      guestTimezone: guestTimezone,
      freeSlots: guestFreeSlots,
    };
  }

  private formatGuestDay(date: Date, guestTimezone: string): string {
    const options = {
      weekday: 'long' as const,
      timeZone: guestTimezone,
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }

  private prependZero(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }
}
