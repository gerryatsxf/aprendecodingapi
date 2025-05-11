import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendNotificationRequestDto } from './dto/send-notification-request.dto';
import Draft from 'nylas/lib/models/draft';

const Nylas = require('nylas');

@Injectable()
export class NotificationService {
  private readonly nylas;
  constructor(private configService: ConfigService) {
    Nylas.config({
      clientId: this.configService.get<string>('NYLAS_CLIENT_ID'),
      clientSecret: this.configService.get<string>('NYLAS_CLIENT_SECRET'),
    });

    this.nylas = Nylas.with(this.configService.get<string>('NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN'));
  }
  async sendNotification(
    notificationRequest: SendNotificationRequestDto,
    meeting: any,
  ) {
    console.log('meeting', meeting);
    console.log('notificationRequest', notificationRequest);
    const draft = new Draft(this.nylas, {
      subject: `¡Hola, ${notificationRequest.guestName}! Gracias por agendar`,
      body: `
        Hola, ${notificationRequest.guestName}
        \n<br>
        \n<br> Nos da mucho gusto saludarte. 
        \n<br>
        \n<br> Te damos una cálido bienvenida de parte de aprendecoding.com :) 
        \n<br> Has agendado una sesión de asesoría para el XX de XX del XXXX a las XX:XX pm. 
        \n<br> Más abajo te compartimos el link de la reunión. 
        \n<br> Te esperamos! 
        \n<br>
        \n<br> Link de videollamada: ${meeting._links.guest_url.href}
        \n<br>
        \n<br> Atentamente, 
        \n<br> aprendecoding.com`,
      to: [
        {
          name: notificationRequest.guestName,
          email: notificationRequest.email,
        },
      ],
    });
    return draft.send();
  }
}
