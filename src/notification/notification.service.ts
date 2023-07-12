import { Injectable } from '@nestjs/common';
import { SendNotificationRequestDto } from './dto/send-notification-request.dto';
import 'dotenv/config';
import { MeetingService } from 'src/meeting/meeting.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Nylas = require('nylas');

Nylas.config({
  clientId: process.env.NYLAS_CLIENT_ID,
  clientSecret: process.env.NYLAS_CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: Draft } = require('nylas/lib/models/draft');

@Injectable()
export class NotificationService {
  constructor(private readonly meetingService: MeetingService) {}

  async sendNotification(notificationRequest: SendNotificationRequestDto) {
    const meeting = await this.meetingService.createMeeting();
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
