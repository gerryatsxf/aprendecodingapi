import { Injectable } from '@nestjs/common';
import { IncomingMessageDto } from './dto/incoming-message.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { FreeSlotService } from 'src/free-slot/free-slot.service';
import { SessionService } from 'src/session/session.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { ConversationReply } from './dto/conversation-reply.dto';
import { TelegramMessageDto } from './dto/telegram-message.dto';

@Injectable()
export class ChatService {
  constructor(
    // private readonly httpService: HttpService,
    // private readonly freeSlotService: FreeSlotService,
    private readonly sessionService: SessionService,
    // private readonly encryptionService: EncryptionService
  ) {}

  readMessage(incomingMessageDto: TelegramMessageDto): Promise<ConversationReply> {
    const leadId = incomingMessageDto.chat.id.toString();
    return this.sessionService.findByLeadId(leadId)
      .then((lead) => {
        if (!lead) {
          return this.sessionService.createLeadSession(leadId)
            .then((newSession) => {
              console.log('New session created:', newSession);
              return {
                text: 'Hello gerry, how can I help you today?',
                sender: 'bot',
                timestamp: new Date().toISOString(),
              };
            })
            .catch((error) => {
              console.error('Error creating new session:', error);
              return {
                text: 'Sorry, something went wrong.',
                sender: 'bot',
                timestamp: new Date().toISOString(),
              };
            });
        } else {
          console.log('Existing session found:', lead);
          return {
            text: 'Welcome back! How can I assist you further?',
            sender: 'bot',
            timestamp: new Date().toISOString(),
          };
        }
      })
      .catch((error) => {
        console.error('Error finding lead:', error);
        return {
          text: 'Sorry, something went wrong.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
      });
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

