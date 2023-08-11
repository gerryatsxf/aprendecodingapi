import { Injectable } from '@nestjs/common';
import { CreateMeetingResultDto } from './dto/create-meeting-result.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import 'dotenv/config';
import * as path from 'path';
import CreateMeetingRequestDto from './dto/create-meeting-request.dto';

@Injectable()
export class MeetingService {
  constructor(private readonly httpService: HttpService) {}

  // async getMeetingStatus(meetingId: string): Promise<string> {
  //   const meeting = await this.meetingModel.findById(meetingId);
  //   if (!meeting) {
  //     throw new BadRequestException('Meeting not found');
  //   }
  //   return meeting.status;
  // }
  // async getMeetingBySessionId(sessionId: string): Promise<IMeeting> {
  //   const meeting = await this.meetingModel.findOne({ sessionId });
  //   if (!meeting) {
  //     throw new BadRequestException('Meeting not found');
  //   }
  //   return meeting;
  // }
  async createMeeting(
    meetingRequest: CreateMeetingRequestDto,
  ): Promise<CreateMeetingResultDto> {
    const BASE_URL = process.env.VONAGE_API_BASE_URL;
    const headersRequest = {
      Authorization: `Bearer ${process.env.VONAGE_JWT_365_DAYS}`,
    };
    return firstValueFrom(
      this.httpService
        .post(
          path.join(BASE_URL, 'meetings/rooms'),
          { display_name: meetingRequest.displayName },
          { headers: headersRequest },
        )
        .pipe(
          tap((resp) => console.log(resp)),
          map((resp) => plainToInstance(CreateMeetingResultDto, resp.data)),
          tap((data) => console.log(data)),
        ),
    );
  }
}
