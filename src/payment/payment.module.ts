import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from '../notification/notification.service';
@Module({
  imports: [NotificationModule],
  controllers: [PaymentController],
  providers: [PaymentService, NotificationService],
})
export class PaymentModule {}
