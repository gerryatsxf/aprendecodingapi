import { Injectable } from '@nestjs/common';
import { AvailabilityService } from '../availability/availability.service';
import { NylasFreeBusy } from '../calendar/entities/nylas-free-busy.entity';
import { CalendarService } from '../calendar/calendar.service';
import BusySlotDto from './dto/busy-slot.dto';
import { GuestFreeSlotDto } from '../availability/dto/guest-free-slot.dto';
import FreeSlotDto from '../availability/dto/free-slot.dto';
import { plainToClass } from 'class-transformer';
import { WorkSlotDto } from '../availability/dto/work-slot.dto';
import { DateTimeDto } from '../date-time/dto/date-time.dto';

@Injectable()
export class FreeSlotService {
  constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly calendarService: CalendarService,
  ) {}

  async getFreeSlots(guestTimezone = 'America/Monterrey') {
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

    const freeSlots: FreeSlotDto[] =
      busySlots.length === 0
        ? workSlots
        : workSlots.filter((workSlot: WorkSlotDto) => {
            // return true if the work slot overlaps with any busy slot
            return (
              workSlot.startTime <= new Date().getTime() &&
              !busySlots.some((busySlot) => {
                return (
                  (workSlot.startTime >= busySlot.startTime &&
                    workSlot.startTime < busySlot.endTime) || // start time is in the middle of the busy slot, or starts at the same time
                  (workSlot.endTime > busySlot.startTime &&
                    workSlot.endTime <= busySlot.endTime) || // end time is in the middle of the busy slot, or ends at the same time
                  (workSlot.startTime == busySlot.startTime &&
                    workSlot.endTime == busySlot.endTime) // work slot is exactly the same as the busy slot
                );
              })
            );
          });

    // Convert the free slots to the guest timezone
    //const guestTimezoneObj = guestTimezone;
    const guestFreeSlots: GuestFreeSlotDto[] = freeSlots.map(
      (slot: FreeSlotDto) => {
        const guestSlot = new GuestFreeSlotDto();
        guestSlot.meetingStartTime = slot.startTime;
        const dateTime = DateTimeDto.timestampToDateTime(
          slot.startTime * 1000,
          guestTimezone,
        );

        guestSlot.guestMeetingDate = dateTime.strDate;
        guestSlot.guestMeetingStartTime = dateTime.strTime;
        guestSlot.meetingStartTime = slot.startTime;
        guestSlot.guestMeetingDay = dateTime.dayOfWeek;

        return guestSlot;
      },
    );

    return {
      guestTimezone: guestTimezone,
      guestTimezoneOffset: DateTimeDto.getTimezoneOffset(guestTimezone),
      freeSlots: guestFreeSlots,
    };
  }
}
