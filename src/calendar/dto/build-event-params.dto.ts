import EventConferencing from 'nylas/lib/models/event-conferencing';
import EventParticipant from 'nylas/lib/models/event-participant';

export class BuildEventParamsDto {
  title: string;
  location: string;
  description: string;
  // calendarId: string;
  busy: boolean;
  participants: EventParticipant[];
  conferencing: EventConferencing;

  calendarName: string;

  eventStartTime: number;
  eventEndTime: number;
  eventType: string;
}
