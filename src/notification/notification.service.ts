import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

import 'dotenv/config';
const Nylas = require('nylas');

Nylas.config({
  clientId: process.env.NYLAS_CLIENT_ID,
  clientSecret: process.env.NYLAS_CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.NYLAS_MAIN_ACCOUNT_ACCESS_TOKEN);
const { default: Draft } = require('nylas/lib/models/draft'); 

@Injectable()
export class NotificationService {
  create(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto)
    const draft = new Draft(nylas, {
      subject: '¡Hola! Gracias por agendar',
      body: 'Te damos un cálido saludo de parte de aprendecoding.com :) Has agendado una sesión de asesoría para el XX de XX del XXXX a las XX:XX pm. Este es el link de la reunión:',
      to: [{ name: 'My Nylas Friend', email: createNotificationDto.email }]
    });
    return draft.send();
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
