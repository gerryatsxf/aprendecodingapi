import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { MeetingService } from './meeting.service';
import CreateBookingRequestDto from './dto/create-booking-request.dto';
import CreateBookingResponseDto from './dto/create-booking.response';
import { SessionInfo } from '../session/decorators/session-info.decorator';

@ApiTags('Meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('book')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Request a meeting booking' })
  @ApiResponse({
    status: 200,
    description: 'The booking has been successfully processed.',
    type: CreateBookingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input payload.',
  })
  requestBooking(
    @Body() bookRequest: CreateBookingRequestDto,
    @SessionInfo() sessionInfo,
  ): Promise<CreateBookingResponseDto> {
    return this.meetingService.requestBooking(bookRequest, sessionInfo);
  }

  // New endpoint for getting meeting status
  @UseGuards(JwtAuthGuard)
  @Get('status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve the status of a meeting' })
  @ApiResponse({
    status: 200,
    description: 'Meeting status retrieved successfully.',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Meeting not found.',
  })
  getMeetingStatus(@SessionInfo() sessionInfo): Promise<string> {
    const sessionId = sessionInfo.id;
    return this.meetingService
      .getMeetingBySessionId(sessionId)
      .then((meeting) => {
        if (!meeting) {
          throw new BadRequestException('Meeting not found');
        }
        const response = {} as any;
        response.meetingStatus = meeting.status;
        response.sessionStatus = sessionInfo.status;
        return response;
      });

    // return this.meetingService.getMeetingStatus(meetingId);
  }
}
