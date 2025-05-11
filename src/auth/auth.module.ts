import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { EncryptionModule } from '../encryption/encryption.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptionService } from '../encryption/encryption.service';
import { JWT_EXPIRES_IN, JWT_SECRET } from './auth.constants';
import { SessionModule } from '../session/session.module';

const jwtFactory = (configService: ConfigService) => ({
  secret: configService.get<string>(JWT_SECRET),
  signOptions: {
    expiresIn: configService.get<string>(JWT_EXPIRES_IN), 
  },
});

const options = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: jwtFactory,
};

@Module({
  imports: [
    EncryptionModule,
    PassportModule,
    JwtModule.registerAsync(options),
    SessionModule,
  ],
  providers: [AuthService, JwtStrategy, EncryptionService, ConfigService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
