import EventConferencing from 'nylas/lib/models/event-conferencing';
import EventParticipant from 'nylas/lib/models/event-participant';
import EventNotification from 'nylas/lib/models/event-notification';

export interface INylasEvent {
  end: number;
  start: number;
  title: string;
  location: string;
  description: string;
  calendarId: string;
  busy: boolean;
  participants: EventParticipant[];
  when: NylasEventWhen;
  metadata: NylasEventMetadata;
  notifications: EventNotification[];
  conferencing: EventConferencing;
  save(options?: NylasEventSaveOptions): Promise<INylasEvent>;
}

interface NylasEventSaveOptions {
  notify_participants?: boolean;
}

interface NylasEventWhen {
  startTime?: number;
  start_time?: number;
  endTime?: number;
  end_time?: number;
}

interface NylasEventMetadata {
  event_type: string;
}
