import { Injectable } from '@nestjs/common';
import { IncomingMessageDto } from './dto/incoming-message.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { FreeSlotService } from 'src/free-slot/free-slot.service';
import { SessionService } from 'src/session/session.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { ConversationReply } from './dto/conversation-reply.dto';

@Injectable()
export class ChatService {
  constructor(
    // private readonly httpService: HttpService,
    // private readonly freeSlotService: FreeSlotService,
    // private readonly sessionService: SessionService,
    // private readonly encryptionService: EncryptionService
  ) {}

  readMessage(incomingMessageDto: IncomingMessageDto) {
    console.log(incomingMessageDto);



    let reply: ConversationReply = {
      text: 'Hello gerry, how can I help you today?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    return reply;
  }

  // findAll() {
  //   return `This action returns all chat`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
