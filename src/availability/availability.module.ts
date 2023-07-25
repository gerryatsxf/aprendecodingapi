import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Module({
  controllers: [],
  providers: [AvailabilityService],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}
