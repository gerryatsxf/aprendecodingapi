/**
 * The main session module of the application.
 * It includes dependencies such as MongooseModule and EncryptionModule.
 */
import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './entities/session.schema';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [
    // Setting up Mongoose feature for session using its schema
    MongooseModule.forFeature([{ name: 'session', schema: SessionSchema }]),
    EncryptionModule,
  ],
  controllers: [], // No controllers for this module
  providers: [SessionService], // Only the SessionService is provided here
  exports: [SessionService], // SessionService is also exported for external use
})
/**
 * SessionModule class that defines and configures the session module.
 */
export class SessionModule {}
