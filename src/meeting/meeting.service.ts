import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { AxiosResponse } from 'axios';
import {plainToClass} from 'class-transformer'
import 'dotenv/config';
import * as path from 'path';
@Injectable()
export class MeetingService {

  constructor(private readonly httpService: HttpService) {}
  
  async create(attendeeName: string): Promise<CreateMeetingDto> {
    const BASE_URL = process.env.VONAGE_API_BASE_URL
    const headersRequest = {
      'Authorization': `Bearer ${process.env.VONAGE_JWT_365_DAYS}`
    }

    return firstValueFrom(this.httpService.post(
      path.join(BASE_URL, 'meetings/rooms'), 
      { "display_name": "Gerry's Meeting Room"},
      { headers: headersRequest }
    ).pipe(
      tap((resp) => console.log(resp)),
      map((resp) => plainToClass(CreateMeetingDto, resp.data)),
      tap((data) => console.log(data))
    ));

  }

  findAll() {
    return `This action returns all meeting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
