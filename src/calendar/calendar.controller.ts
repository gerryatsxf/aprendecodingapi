// calendar.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Calendar')
@Controller('calendar') // Set the base path for the controller
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @UseGuards(JwtAuthGuard)
  @Get('timezones') // Set the path for the controller method
  @ApiBearerAuth()
  getTimezoneList(): string[] {
    return this.calendarService.getTimezoneList();
  }
}
