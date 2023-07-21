import { PartialType } from '@nestjs/swagger';
import { CreateDateTimeDto } from './create-date-time.dto';

export class UpdateDateTimeDto extends PartialType(CreateDateTimeDto) {}
