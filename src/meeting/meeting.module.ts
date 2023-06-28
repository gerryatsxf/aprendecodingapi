import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
  controllers: [],
  providers: [MeetingService]
})
export class MeetingModule {}
