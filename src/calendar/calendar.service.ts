import { Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import 'dotenv/config';
import NylasCalendar from 'nylas/lib/models/calendar';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Nylas = require('nylas');
console.log(process.env);
Nylas.config({
  clientId: process.env.NYLAS_CLIENT_ID,
  clientSecret: process.env.NYLAS_CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN);

const kebabCase = (s: string) =>
  s
    .normalize('NFD') // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .replace(/([a-z])([A-Z])/g, '$1-$2') // split camelCase
    .replace(/[\s_]+/g, '-') // replace all spaces and low dash
    .toLowerCase(); // convert to lower case
@Injectable()
export class CalendarService {
  private nylas;

  constructor() {
    Nylas.config({
      clientId: process.env.NYLAS_CLIENT_ID,
      clientSecret: process.env.NYLAS_CLIENT_SECRET,
    });
    this.nylas = Nylas.with(process.env.NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN);
  }
  create(createCalendarDto: CreateCalendarDto) {
    const calendar = new NylasCalendar(nylas, {
      name: createCalendarDto.name,
      description: createCalendarDto.description,
      location: 'En línea',
      timezone: 'America/Los_Angeles',
      metadata: {
        keyname: kebabCase(createCalendarDto.name),
      },
    });

    return calendar.save();
  }

  findAll() {
    return nylas.calendars.list();
  }

  findOne(id: string) {
    return nylas.calendars.find(id);
  }

  update(id: string, updateCalendarDto: UpdateCalendarDto) {
    return nylas.calendars.find(id).then((calendar: NylasCalendar) => {
      calendar.name = updateCalendarDto.name;
      calendar.description = updateCalendarDto.description;
      calendar.metadata = {
        keyname: kebabCase(updateCalendarDto.name),
      };
      return calendar.save();
    });
  }

  remove(id: string) {
    return nylas.calendars.delete(id);
  }

  async getFreeBusy(startTime: number, endTime: number, emails: string[]) {
    return await this.nylas.calendars.freeBusy({
      startTime: startTime,
      endTime: endTime,
      emails: emails,
    });
  }
}
