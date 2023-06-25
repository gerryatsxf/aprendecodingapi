import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MeetingModule } from './meeting/meeting.module';

@Module({
  imports: [PaymentModule, MeetingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
