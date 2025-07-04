import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { IncomingMessageDto } from './dto/incoming-message.dto';
import { TelegramMessageDto } from './dto/telegram-message.dto';
import { plainToInstance } from 'class-transformer';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() incomingMessage: IncomingMessageDto) {
    const telegramMessage: TelegramMessageDto = plainToInstance(
      TelegramMessageDto,
      incomingMessage.message
    );
    console.log({ telegramMessage });
    return this.chatService.readMessage(telegramMessage);
  }
}
