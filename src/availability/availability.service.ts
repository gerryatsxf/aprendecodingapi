import { Injectable } from '@nestjs/common';
import { Availability, WorkSlot } from './entities/availability.entity';
import 'dotenv/config';
import { HoomanWorkSlotDto } from './dto/work-slot.dto';

function prependZero(time) {
  return time < 10 ? `0${time}` : time;
}
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
  { startTime: '17:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '19:00' },
  { startTime: '19:00', endTime: '20:00' },
];

availability.workSlots = [];
availability.timezone = 'America/Monterrey';
availability.email = process.env.NYLAS_MAIN_ACCOUNT_EMAIL;
availableDays.forEach((day) => {
  availableHours.forEach((hour) => {
    const workSlot = new HoomanWorkSlotDto();
    workSlot.day = day;
    workSlot.startTime = hour.startTime;
    workSlot.endTime = hour.endTime;
    //workSlot.localTimezoneDate = '';
    availability.workSlots.push(workSlot);
  });
});

function getNow() {
  const d = new Date();

  // convert to msec since Jan 1 1970
  const localTime = d.getTime();

  // obtain local UTC offset and convert to msec
  const localOffset = d.getTimezoneOffset() * 60 * 1000;

  // obtain UTC time in msec
  const utcTime = localTime + localOffset;

  // obtain and add destination's UTC time offset
  const estOffset = getMonterreyOffset();
  const monterreyTime = utcTime + 60 * 60 * 1000 * estOffset;

  // convert msec value to date string
  return new Date(monterreyTime);
}
// Get time zone offset for 'America/Monterrey'
function getMonterreyOffset() {
  const stdTimezoneOffset = () => {
    const jan = new Date(0, 0, 1);
    const jul = new Date(6, 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };

  const today = new Date();

  const isDstObserved = (today: Date) => {
    return today.getTimezoneOffset() < stdTimezoneOffset();
  };

  if (isDstObserved(today)) {
    return -5; // DST is observed (-5 hours offset)
  } else {
    return -6; // DST is not observed (-6 hours offset)
  }
}

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
        const strTargetDay = this.getDateOfNextDayOfWeek(slot.day);

        const startStrDateTime = `${strTargetDay}T${
          slot.startTime
        }:00.000-${prependZero(-getMonterreyOffset())}:00`;
        const endStrDateTime = `${strTargetDay}T${
          slot.endTime
        }:00.000-${prependZero(-getMonterreyOffset())}:00`;

        const startDateTime = new Date(startStrDateTime);
        const endDateTime = new Date(endStrDateTime);

        const workSlot = new WorkSlot();
        workSlot.localTimezoneDate = strTargetDay;
        workSlot.day = slot.day;
        workSlot.startTime = Math.floor(startDateTime.getTime() / 1000);
        workSlot.endTime = Math.floor(endDateTime.getTime() / 1000);
        workSlot.startDateTime = startDateTime;
        workSlot.endDateTime = endDateTime;
        return workSlot;
      }),
    };
  }

  getDateOfNextDayOfWeek(dayOfWeek: string): string {
    const daysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const currentDayOfWeek = getNow().getDay();

    const targetDayOfWeekIndex = daysOfWeek.indexOf(dayOfWeek.toLowerCase());
    const daysUntilTargetDay =
      (targetDayOfWeekIndex + 7 - currentDayOfWeek) % 7;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysUntilTargetDay);

    const day = prependZero(targetDate.getDate());
    const month = prependZero(targetDate.getMonth() + 1);
    const year = targetDate.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
