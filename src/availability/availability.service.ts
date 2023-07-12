import { Injectable } from '@nestjs/common';
import { Availability } from './entities/availability.entity';

const availability = new Availability();
availability.id = '2t4noiewokfn23pofd';
availability.days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  //'friday',
  //'saturday',
  //'sunday',
];
availability.startTime = '18:00';
availability.endTime = '20:00';
availability.timezone = 'America/Monterrey';

@Injectable()
export class AvailabilityService {
  findAll() {
    const availabilities = [];
    availabilities.push(availability);
    return availabilities;
  }

  findOne(id: string) {
    return availability.id === id ? availability : null;
  }

  findCurrent() {
    return availability;
  }
}
