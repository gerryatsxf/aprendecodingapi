import { ApiProperty } from '@nestjs/swagger';

class CreateBookingResponseDto {
  @ApiProperty({
    description: 'Expiration timestamp for meeting/booking reservation',
    type: Number,
  })
  bookingReservationExpiresTimestamp: number;

  @ApiProperty({ description: 'The payment link', type: String })
  paymentLink: string;

  @ApiProperty({
    description: 'The duration of reservation before going stale',
    type: Number,
  })
  bookingReservationDuration: number;
}

export default CreateBookingResponseDto;
