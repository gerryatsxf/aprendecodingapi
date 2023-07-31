// calendar.controller.ts

import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MeetingService } from './meeting.service';

@ApiTags('Meeting')
@Controller('meeting') // Set the base path for the controller
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('book') // Set the path for the controller method
  @ApiBearerAuth()
  requestBooking(): Promise<string[]> {
    return this.meetingService.requestBooking();
  }
}
