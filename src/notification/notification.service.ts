import { Injectable } from '@nestjs/common';
import { SendNotificationRequestDto } from './dto/send-notification-request.dto';
import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import Draft from 'nylas/lib/models/draft';

const Nylas = require('nylas');

Nylas.config({
  clientId: process.env.NYLAS_CLIENT_ID,
  clientSecret: process.env.NYLAS_CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN);

@Injectable()
export class NotificationService {
  constructor() {}

  async sendNotification(
    notificationRequest: SendNotificationRequestDto,
    meeting: any,
  ) {
    // const meeting = await this.meetingService.createMeeting();
    console.log('meeting', meeting);
    console.log('notificationRequest', notificationRequest);
    const draft = new Draft(nylas, {
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
