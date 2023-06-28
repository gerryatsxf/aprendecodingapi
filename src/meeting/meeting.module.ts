import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule {}
