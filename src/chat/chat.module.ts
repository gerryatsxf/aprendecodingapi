import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { HttpModule } from '@nestjs/axios';
import { FreeSlotService } from '../free-slot/free-slot.service';
import { FreeSlotModule } from '../free-slot/free-slot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from '../booking/entities/booking.schema';
import { AvailabilityService } from '../availability/availability.service';
import { AvailabilityModule } from '../availability/availability.module';
import { CalendarModule } from '../calendar/calendar.module';
import { CalendarService } from '../calendar/calendar.service';
import { ChatController } from './chat.controller';
import { SessionModule } from '../session/session.module';
import { SessionService } from '../session/session.service';
import { SessionSchema } from '../session/entities/session.schema';
import { EncryptionModule } from '../encryption/encryption.module';
import { EncryptionService } from '../encryption/encryption.service';

@Module({
  imports: [
    HttpModule,
    SessionModule
  ],
  exports: [HttpModule],
  controllers: [ChatController],
  providers: [
    ChatService,
  ],
})
export class ChatModule {}
