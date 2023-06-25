import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MeetingModule } from './meeting/meeting.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [PaymentModule, MeetingModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
