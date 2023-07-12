import { Injectable } from '@nestjs/common';
import { CreateMeetingResultDto } from './dto/create-meeting-result.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { plainToClass } from 'class-transformer';
import 'dotenv/config';
import * as path from 'path';
@Injectable()
export class MeetingService {
  constructor(private readonly httpService: HttpService) {}

  async createMeeting(): Promise<CreateMeetingResultDto> {
    const BASE_URL = process.env.VONAGE_API_BASE_URL;
    const headersRequest = {
      Authorization: `Bearer ${process.env.VONAGE_JWT_365_DAYS}`,
    };
    return firstValueFrom(
      this.httpService
        .post(
          path.join(BASE_URL, 'meetings/rooms'),
          { display_name: 'Aula virtual de aprendecoding.com' },
          { headers: headersRequest },
        )
        .pipe(
          tap((resp) => console.log(resp)),
          map((resp) => plainToClass(CreateMeetingResultDto, resp.data)),
          tap((data) => console.log(data)),
        ),
    );
  }
}
