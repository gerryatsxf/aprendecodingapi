import { Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import 'dotenv/config';
import NylasCalendar from 'nylas/lib/models/calendar';
import { NylasFreeBusy } from './entities/nylas-free-busy.entity';
import { DateTimeDto } from '../date-time/dto/date-time.dto';
import EventNotification, {
  EventNotificationType,
} from 'nylas/lib/models/event-notification';
import { INylasEvent } from './dto/nylas-event.interface';
import EventConferencing from 'nylas/lib/models/event-conferencing';
import EventParticipant from 'nylas/lib/models/event-participant';
import { BuildEventParamsDto } from './dto/build-event-params.dto';
import { ScheduleEventParamsDto } from './dto/schedule-event-params.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Nylas = require('nylas');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: Event } = require('nylas/lib/models/event');

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
      timezone: 'America/Monterrey',
      metadata: {
        keyname: kebabCase(createCalendarDto.name),
      },
    });

    return calendar.save();
  }

  getTimezoneList(): string[] {
    return DateTimeDto.getTimeZoneList();
  }

  findAll() {
    return nylas.calendars.list();
  }

  getCalendarByName(keyname: string) {
    return nylas.calendars
      .list()
      .then((calendars: NylasCalendar[]) => {
        return calendars.find((calendar: NylasCalendar) => {
          const metadata = calendar.metadata ? calendar.metadata : {};
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return metadata.keyname ? metadata.keyname === keyname : '';
        });
      })
      .catch((err) => {
        console.log(err);
      });
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

  async getFreeBusy(
    startTime: number,
    endTime: number,
    emails: string[],
  ): Promise<NylasFreeBusy[]> {
    return await this.nylas.calendars.freeBusy({
      startTime: startTime,
      endTime: endTime,
      emails: emails,
    });
  }

  async buildEvent(params: BuildEventParamsDto): Promise<INylasEvent> {
    const event = new Event(nylas) as unknown as INylasEvent;
    event.title = params.title;
    event.location = params.location;
    event.description = params.description;
    event.when = {
      startTime: params.eventStartTime,
      endTime: params.eventEndTime,
    };
    // event.when.startTime = params.eventStartTime;
    // event.when.endTime = params.eventEndTime;
    event.metadata = { event_type: params.eventType };
    event.busy = true;
    event.calendarId = await this.getCalendarByName(params.calendarName).then(
      (calendar: NylasCalendar) => {
        console.log({ calendar });
        return calendar.id;
      },
    );
    event.conferencing = new EventConferencing({
      provider: 'Zoom Meeting',
      details: {
        url: 'https://us02web.zoom.us/j/****************',
        meetingCode: '213',
        password: 'xyz',
        phone: ['+11234567890'],
      },
    });
    event.participants = [
      new EventParticipant({
        name: 'My Nylas Friend',
        email: 'swag@nylas.com',
      }),
    ];
    event.notifications = [
      new EventNotification({
        body: 'Reminding you about our meeting.',
        minutesBeforeEvent: 600,
        subject: 'Test Event Notification',
        type: EventNotificationType.Email,
      }),
    ];
    console.log({ event })
    return event;
  }

  async scheduleEvent(scheduleEventParamsDto: ScheduleEventParamsDto) {
    //Create a new event
    const params = new BuildEventParamsDto();
    params.title = scheduleEventParamsDto.title;
    params.location = 'Videollamada en línea';
    params.description = scheduleEventParamsDto.description;

    params.eventStartTime = scheduleEventParamsDto.eventStartTime;
    params.eventEndTime = scheduleEventParamsDto.eventEndTime;
    params.eventType = scheduleEventParamsDto.meetingType;
    params.calendarName =
      scheduleEventParamsDto.meetingType === 'tutoring'
        ? 'asesorias'
        : 'consultoria';
    const event: INylasEvent = await this.buildEvent(params);
    await event
      .save({ notify_participants: true })
      .then((event: INylasEvent) => {
        console.log(event);
      });
    return event;
  }
}
