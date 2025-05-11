import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module';
import * as path from 'path';

@Module({
  imports: [,
    AppConfigModule,
    NotificationModule,
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../env/dev.env'),
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}