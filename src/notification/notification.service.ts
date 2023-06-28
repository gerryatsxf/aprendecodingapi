import { Injectable } from '@nestjs/common';
import { SendNotificationRequestDto } from './dto/send-notification-request.dto';
import 'dotenv/config';
import { MeetingService } from 'src/meeting/meeting.service';
const Nylas = require('nylas');

Nylas.config({
  clientId: process.env.NYLAS_CLIENT_ID,
  clientSecret: process.env.NYLAS_CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN);
const { default: Draft } = require('nylas/lib/models/draft'); 

@Injectable()
export class NotificationService {

  constructor(private readonly meetingService: MeetingService) {}

  async sendNotification(notificationRequest: SendNotificationRequestDto) {
    const meeting = await this.meetingService.createMeeting()
    const draft = new Draft(nylas, {
      subject: `¡Hola, ${notificationRequest.guestName}! Gracias por agendar`,
      body: `Mucho gusto ${notificationRequest.guestName}. Te damos un cálido saludo de parte de aprendecoding.com :) Has agendado una sesión de asesoría para el XX de XX del XXXX a las XX:XX pm. Este es el link de la reunión: ` + meeting._links.guest_url.href,
      to: [{ name: notificationRequest.guestName, email: notificationRequest.email }]
    });
    return draft.send()
  }

}
