import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { FromDto } from './from.dto';
import { ChatDto } from './chat.dto';
import { AttachmentDto } from './attachment.dto';

export class TelegramMessageDto {
  @IsNumber()
  message_id: number;

  @ValidateNested()
  @Type(() => FromDto)
  from: FromDto;

  @ValidateNested()
  @Type(() => ChatDto)
  chat: ChatDto;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AttachmentDto)
  attachment?: AttachmentDto;
}
