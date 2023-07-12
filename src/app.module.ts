import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MeetingModule } from './meeting/meeting.module';
import { NotificationModule } from './notification/notification.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [PaymentModule, MeetingModule, NotificationModule, CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
