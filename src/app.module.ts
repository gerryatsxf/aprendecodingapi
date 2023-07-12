import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MeetingModule } from './meeting/meeting.module';
import { NotificationModule } from './notification/notification.module';
import { CalendarModule } from './calendar/calendar.module';
import { AvailabilityModule } from './availability/availability.module';
import { FreeSlotModule } from './free-slot/free-slot.module';

@Module({
  imports: [
    PaymentModule,
    MeetingModule,
    NotificationModule,
    CalendarModule,
    AvailabilityModule,
    FreeSlotModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
