import { Injectable } from '@nestjs/common';
import { Availability, WorkSlot } from './entities/availability.entity';
import 'dotenv/config';
import { DateTime } from 'luxon';
import { TimestampSlotDto } from './dto/timestamp-slot.dto';
// TODO: use a proper database to store this information

const availability = new Availability();
availability.id = '2t4noiewokfn23pofd';
const availableDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  //'friday',
  //'saturday',
  //'sunday',
];

const availableHours = [
  { startTime: '18:00', endTime: '18:59' },
  { startTime: '19:00', endTime: '19:59' },
];

availability.workSlots = [];
availability.timezone = 'America/Monterrey';
availability.email = process.env.NYLAS_MAIN_ACCOUNT_EMAIL;
availableDays.forEach((day) => {
  availableHours.forEach((hour) => {
    const workSlot = new WorkSlot();
    workSlot.day = day;
    workSlot.startTime = hour.startTime;
    workSlot.endTime = hour.endTime;
    workSlot.localTimezoneDate = '';
    availability.workSlots.push(workSlot);
  });
});

@Injectable()
export class AvailabilityService {
  findAll() {
    const availabilities = [];
    availabilities.push(availability);
    return availabilities;
  }

  findOne(id: string) {
    return availability.id === id ? availability : null;
  }

  findCurrent() {
    return availability;
  }

  findWorkSlots() {
    return {
      timezone: availability.timezone,
      workSlots: availability.workSlots.map((slot) => {
        const now = DateTime.local().setZone(availability.timezone);
        const targetDay = this.getNextDayOfWeek(now, slot.day);

        const startDateTime = targetDay.set({
          hour: parseInt(slot.startTime.split(':')[0]),
          minute: parseInt(slot.startTime.split(':')[1]),
        });

        const endDateTime = targetDay.set({
          hour: parseInt(slot.endTime.split(':')[0]),
          minute: parseInt(slot.endTime.split(':')[1]),
        });

        const freeSlot = new TimestampSlotDto();
        freeSlot.day = slot.day;
        freeSlot.localTimezoneDate = targetDay.toISODate();
        freeSlot.startTime = startDateTime.toSeconds();
        freeSlot.endTime = endDateTime.toSeconds();

        return freeSlot;
      }),
    };
  }

  getNextDayOfWeek(date: DateTime, dayOfWeek: string) {
    const daysOfWeek = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    const dayOfWeekIndex = daysOfWeek.indexOf(dayOfWeek.toLowerCase());
    if (dayOfWeekIndex === -1) {
      throw new Error(`Invalid day of week: ${dayOfWeek}`);
    }

    const diff = dayOfWeekIndex + 1 - date.weekday;
    const nextDate = date.plus({ days: diff >= 0 ? diff : diff + 7 });

    return nextDate.startOf('day');
  }
}
