export class ScheduleEventParamsDto {
  // eventId: string; // Unique identifier for the event
  title: string; // Title or name of the event
  description: string; // Detailed description about the event
  eventStartTime: number; // Start time of the event
  eventEndTime: number; // End time of the event
  meetingType: string; // Type of meeting (tutoring, consultancy)

  guestMeetingLink: string; // Link to the meeting (optional)

  customerEmail: string; // Email of the customer
  // location?: string; // Location of the event (optional)
  customerName: string;
  hostMeetingLink: string;
}
