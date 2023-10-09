import { ApiProperty } from '@nestjs/swagger';

export class GetBookingStatusResponse {
  @ApiProperty({
    description: 'The status of the booking',
    example: 'confirmed',
  })
  bookingStatus: string;

  @ApiProperty({
    description: 'The status of the session',
    example: 'active',
  })
  sessionStatus: string;
}
