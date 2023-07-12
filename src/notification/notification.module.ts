import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MeetingModule } from 'src/meeting/meeting.module';
import { MeetingService } from 'src/meeting/meeting.service';

@Module({
  imports: [MeetingModule],
  controllers: [],
  providers: [NotificationService, MeetingService],
  exports: [NotificationService],
})
export class NotificationModule {}
