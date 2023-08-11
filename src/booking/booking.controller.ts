import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { BookingService } from './booking.service';
import CreateBookingRequestDto from './dto/create-booking-request.dto';
import CreateBookingResponseDto from './dto/create-booking.response';
import { SessionInfo } from '../session/decorators/session-info.decorator';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Request a booking' })
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
    return this.bookingService.requestBooking(bookRequest, sessionInfo);
  }

  // New endpoint for getting booking status
  @UseGuards(JwtAuthGuard)
  @Get('status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve the status of a booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking status retrieved successfully.',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Booking not found.',
  })
  getBookingStatus(@SessionInfo() sessionInfo): Promise<string> {
    const sessionId = sessionInfo.id;
    return this.bookingService
      .getBookingBySessionId(sessionId)
      .then((booking) => {
        if (!booking) {
          throw new BadRequestException('Booking not found');
        }
        const response = {} as any;
        response.bookingStatus = booking.status;
        response.sessionStatus = sessionInfo.status;
        return response;
      });

    // return this.bookingService.getBookingStatus(bookingId);
  }
}
