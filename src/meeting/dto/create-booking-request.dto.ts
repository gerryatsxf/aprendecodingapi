import { ApiProperty } from '@nestjs/swagger';

class CreateBookingRequestDto {
  @ApiProperty({
    description: 'The timestamp of the meeting',
    example: 1629462063,
  })
  timestamp: number;

  @ApiProperty({
    description: 'The type of meeting',
    example: 'tutoring',
    enum: ['tutoring', 'consultancy'],
  })
  type: 'tutoring' | 'consultancy';
}

export default CreateBookingRequestDto;
