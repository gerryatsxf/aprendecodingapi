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
import { ISession } from 'src/session/entities/session.interface';
import dialogsConfig from './dialogs.config'
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class ChatService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,  
    // private readonly freeSlotService: FreeSlotService,
    private readonly sessionService: SessionService,
    // private readonly encryptionService: EncryptionService
  ) {}
  async sendMessage(reply: ConversationReply) {
    const url = 'https://hook.us2.make.com/pmj3fg7g4r8ixh973byxnwjhd67vezqu';
    console.log('sending message');
    const response = await lastValueFrom(this.httpService.post(url, { reply }));
    console.log('Message sent:', response.data);
  }
  readMessage(incomingMessageDto: TelegramMessageDto){
    const leadId = incomingMessageDto.chat.id.toString();
    this.sessionService.findByLeadId(leadId)
      .then((lead) => {
        if (!lead || lead.status === 'processed') {
          if (lead) {
            this.authService.deleteToken(leadId)
          }
          return this.sessionService.createLeadSession(leadId)
            .then((newSession) => {
              console.log('New session created:', newSession);
              const nextDialog = this.getNextDialog(newSession,  incomingMessageDto.text);


              const result: ConversationReply = {
                text: nextDialog.text ,
                sender: 'bot',
                timestamp: new Date().toISOString(),
                replyOptions: nextDialog.replyOptions || [],
                leadId: leadId, // Include leadId in the reply
              };
              this.sendMessage(result);
            })
            .catch((error) => {
              console.error('Error creating new session:', error);
              const result: ConversationReply = {
                text: 'Sorry, something went wrong.',
                sender: 'bot',
                timestamp: new Date().toISOString(),
                replyOptions: [],
                leadId: leadId, // Include leadId in the reply
              };
              return result;
            });
        } else {
          console.log('Existing session found:', lead );

          let nextDialog = this.getNextDialog(lead,  incomingMessageDto.text);
          console.log(nextDialog)
          while(nextDialog.setNextStage !== null && nextDialog.setNextStage !== undefined) {
            // console.log(nextDialog)
            this.sendMessage(nextDialog);
            const dialog = dialogsConfig[nextDialog.setNextStage];
            if (dialog.setNextStage !== null && dialog.setNextStage !== undefined) {
              this.sessionService.update(lead.id, { leadStage: dialog.setNextStage });
              const result: ConversationReply = {
                text: dialog.message, 
                replyOptions: dialog.replyOptions.map(option => `${option.value}:${option.nextStage}` ),
                sender: 'bot',
                timestamp: new Date().toISOString(),
                leadId: lead.leadId, // Include leadId in the reply
              };
              nextDialog = result;}
            else {
            const result: ConversationReply = {
              text: dialog.message, 
              replyOptions: dialog.replyOptions.map(option => `${option.value}:${option.nextStage}` ),
              sender: 'bot',
              timestamp: new Date().toISOString(),
              leadId: lead.leadId, // Include leadId in the reply
            };
            nextDialog = result;}
            console.log(nextDialog)
          }



          this.sendMessage(nextDialog);
          
          // return result;
        }
      })
      .catch((error) => {
        console.error('Error finding lead:', error);
        return {
          text: 'Sorry, something went wrong.',
          sender: 'bot',
          timestamp: new Date().toISOString(),
          replyOptions: [],
          leadId: leadId, // Include leadId in the reply
        };
      });
  }

  decideNextStep(text: string, currentStage: string, replyIdentifiers: string[]): string {
    // Logic to decide the next step based on the text and current stage
    // This is a placeholder implementation
    // if (text.includes('tz_sub_s1')) {
    
    for (const replyIdentifier of replyIdentifiers){
      const [message, nextStage] = text.split(':');
      if (message.includes(replyIdentifier)) {
        return nextStage; // Example: move to stage 2 for timezone
      }
    }
    //   return 's2'; // Example: move to stage 2 for booking
    // } else if (text.includes('cancel')) {
    //   return 's3'; // Example: move to stage 3 for cancellation
    // }
    return currentStage; // Default to current stage if no match
  }
  getNextDialog(session: ISession, incomingMessage: string): ConversationReply {
    const currentStage = session.leadStage 
    const replyIdentifiers = dialogsConfig[currentStage]?.replyIdentifiers || [];
    const nextStage = this.decideNextStep(incomingMessage, currentStage, replyIdentifiers);
    this.sessionService.update(session.id, { leadStage: nextStage });
    const dialog = dialogsConfig[nextStage];
    console.log({dialog})

    if (!dialog) {
      const emptyResult: ConversationReply = {
        text: 'No further actions available.',
        replyOptions: [],
        sender: 'bot',
        timestamp: new Date().toISOString(),
        leadId: session.leadId, // Include leadId in the reply
        setNextStage: dialog?.setNextStage || null,
      };
      return emptyResult;
    }



    // // Update the session with the next stage
    // session.leadStage = 
    
    
    
    // dialog.nextStage || 'end';
    // this.sessionService.update(session._id, session);
    const result: ConversationReply = {
      text: dialog.message, 
      replyOptions: Array.isArray(dialog.replyOptions)
        ? dialog.replyOptions.map(option => `${option.value}:${option.nextStage}`)
        : [],
      sender: 'bot',
      timestamp: new Date().toISOString(),
      leadId: session.leadId, // Include leadId in the reply
    };
    return result
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

