import { Injectable } from '@nestjs/common';
import { Availability } from './entities/availability.entity';
import 'dotenv/config';
import { DateTime } from 'luxon';
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

availability.workSlots = [];
availability.timezone = 'America/Monterrey';
availability.email = process.env.NYLAS_MAIN_ACCOUNT_EMAIL;
availableDays.forEach((day) => {
  availability.workSlots.push({
    day,
    startTime: '18:00',
    endTime: '18:59',
  });
  availability.workSlots.push({
    day,
    startTime: '19:00',
    endTime: '19:59',
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
    return availability.workSlots.map((slot) => {
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

      return {
        day: slot.day,
        startTime: startDateTime.toSeconds(),
        endTime: endDateTime.toSeconds(),
      };
    });
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
