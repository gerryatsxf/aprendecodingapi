import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MeetingModule } from './meeting/meeting.module';
import { NotificationModule } from './notification/notification.module';
import { CalendarModule } from './calendar/calendar.module';
import { AvailabilityModule } from './availability/availability.module';
import { FreeSlotModule } from './free-slot/free-slot.module';
import { DateTimeModule } from './date-time/date-time.module';
import { DateTimeModule } from './date-time/date-time.module';

@Module({
  imports: [
    PaymentModule,
    MeetingModule,
    NotificationModule,
    CalendarModule,
    AvailabilityModule,
    FreeSlotModule,
    DateTimeModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
