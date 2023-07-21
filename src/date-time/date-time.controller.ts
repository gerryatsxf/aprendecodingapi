import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DateTimeService } from './date-time.service';
import { CreateDateTimeDto } from './dto/create-date-time.dto';
import { UpdateDateTimeDto } from './dto/update-date-time.dto';

@Controller('date-time')
export class DateTimeController {
  constructor(private readonly dateTimeService: DateTimeService) {}

  @Post()
  create(@Body() createDateTimeDto: CreateDateTimeDto) {
    return this.dateTimeService.create(createDateTimeDto);
  }

  @Get()
  findAll() {
    return this.dateTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dateTimeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDateTimeDto: UpdateDateTimeDto) {
    return this.dateTimeService.update(+id, updateDateTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dateTimeService.remove(+id);
  }
}
