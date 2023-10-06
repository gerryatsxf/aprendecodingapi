import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MeetingModule } from './meeting/meeting.module';
import { NotificationModule } from './notification/notification.module';
import { CalendarModule } from './calendar/calendar.module';
import { AvailabilityModule } from './availability/availability.module';
import { FreeSlotModule } from './free-slot/free-slot.module';
import { DateTimeModule } from './date-time/date-time.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
//console.log(process.env.MONGO_DB_CONNECTION_URL);

const MONGO_DB_CONNECTION_URL = `${process.env.MONGO_DB_PROTOCOL}://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/?retryWrites=true&w=majority`;

console.log(MONGO_DB_CONNECTION_URL);
@Module({
  imports: [
    AuthModule,
    PaymentModule,
    MeetingModule,
    NotificationModule,
    CalendarModule,
    AvailabilityModule,
    FreeSlotModule,
    DateTimeModule,
    SessionModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGO_DB_CONNECTION_URL),
    BookingModule,
    ProductModule,
    CartModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
