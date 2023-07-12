import {
  Controller,
  Get,
  NotImplementedException,
  Param,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  findAll() {
    // return this.availabilityService.findAll();
    return new NotImplementedException();
  }

  @Get('current')
  findCurrent() {
    return this.availabilityService.findCurrent();
    // return new NotImplementedException();
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(@Param('id') id: string) {
    // return this.availabilityService.findOne(id);
    return new NotImplementedException();
  }
}
