export class CreateSessionRequestDto {
  timestamp: number;
  duration: number; // milliseconds
  timezone?: string;
  status = 'lead';
  leadId?: string
}
