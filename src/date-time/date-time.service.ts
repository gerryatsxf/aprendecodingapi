import { Injectable } from '@nestjs/common';
import { CreateDateTimeDto } from './dto/create-date-time.dto';
import { UpdateDateTimeDto } from './dto/update-date-time.dto';
import { DateTimeDto } from './dto/date-time.dto';

@Injectable()
export class DateTimeService {
  create(createDateTimeDto: CreateDateTimeDto) {
    return 'This action adds a new dateTime';
  }

  findAll() {
    return `This action returns all dateTime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dateTime`;
  }

  update(id: number, updateDateTimeDto: UpdateDateTimeDto) {
    return `This action updates a #${id} dateTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} dateTime`;
  }

  timestampToDateTime(timestamp: number): DateTimeDto {
    const date = new Date(timestamp);
    const dateTime: DateTimeDto = new DateTimeDto();
    dateTime.timestamp = timestamp;
    dateTime.strDate = date.toLocaleDateString();
    dateTime.strTime = date.toLocaleTimeString();
    dateTime.offset = date.getTimezoneOffset();
    dateTime.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return dateTime;
  }
}
