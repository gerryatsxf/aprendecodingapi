export class CreateSessionDto {
  timestamp: number;
  duration: number; // milliseconds
  timezone?: string;
}
