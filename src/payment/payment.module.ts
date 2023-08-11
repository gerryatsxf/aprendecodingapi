import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from '../notification/notification.service';
import { BookingModule } from '../booking/booking.module';
import { BookingService } from '../booking/booking.service';
import { FreeSlotModule } from '../free-slot/free-slot.module';
import { FreeSlotService } from '../free-slot/free-slot.service';
import { SessionModule } from '../session/session.module';
import { SessionService } from '../session/session.service';
import { EncryptionModule } from '../encryption/encryption.module';
import { EncryptionService } from '../encryption/encryption.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from '../session/entities/session.schema';
import { BookingSchema } from '../booking/entities/booking.schema';
import { AvailabilityModule } from '../availability/availability.module';
import { AvailabilityService } from '../availability/availability.service';
import { CalendarModule } from '../calendar/calendar.module';
import { CalendarService } from '../calendar/calendar.service';
import { MeetingModule } from "../meeting/meeting.module";
import { MeetingService } from "../meeting/meeting.service";
@Module({
  imports: [
    NotificationModule,
    BookingModule,
    FreeSlotModule,
    SessionModule,
    EncryptionModule,
    MongooseModule.forFeature([{ name: 'session', schema: SessionSchema }]),
    MongooseModule.forFeature([{ name: 'booking', schema: BookingSchema }]),
    AvailabilityModule,
    CalendarModule,
    MeetingModule
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    NotificationService,
    BookingService,
    FreeSlotService,
    SessionService,
    EncryptionService,
    AvailabilityService,
    CalendarService,
    MeetingService
  ],
})
export class PaymentModule {}
