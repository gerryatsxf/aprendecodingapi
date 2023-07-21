import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
  Query,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { ApiTags } from '@nestjs/swagger';

// NOTE: all these endpoints should work, they are just not in use and thus are disabled for now.

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(@Body() createCalendarDto: CreateCalendarDto) {
    // return this.calendarService.create(createCalendarDto);
    return new NotImplementedException();
  }

  @Get()
  findAll() {
    return this.calendarService.findAll();
    // return new NotImplementedException();
  }

  @Get('freebusy')
  async getFreeBusy() {
    const startTime = Math.floor(Date.now() / 1000); // current unix
    const endTime = startTime + 60 * 60 * 24 * 5; // add 5 days in seconds
    const mainEmailAccount = process.env.NYLAS_MAIN_ACCOUNT_EMAIL;
    return await this.calendarService.getFreeBusy(startTime, endTime, [
      mainEmailAccount,
    ]);
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(@Param('id') id: string) {
    return this.calendarService.findOne(id);
    // return new NotImplementedException();
  }

  @Patch(':id')
  update(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() updateCalendarDto: UpdateCalendarDto,
  ) {
    return this.calendarService.update(id, updateCalendarDto);
    // return new NotImplementedException();
  }

  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(@Param('id') id: string) {
    // return this.calendarService.remove(id);
    return new NotImplementedException();
  }
}
