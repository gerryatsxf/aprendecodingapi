import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
// import { CreateChatDto } from './dto/incoming-message.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { IncomingMessageDto } from './dto/incoming-message.dto';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() incomingMessageDto: IncomingMessageDto) {
    return this.chatService.readMessage(incomingMessageDto);
  }


}
