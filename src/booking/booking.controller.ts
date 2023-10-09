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
import { GetBookingStatusResponse } from './dto/get-booking-status-response';

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
    type: GetBookingStatusResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Booking not found.',
  })
  getBookingStatus(
    @SessionInfo() sessionInfo,
  ): Promise<GetBookingStatusResponse> {
    return this.bookingService.getBookingStatus(sessionInfo);
  }
}
