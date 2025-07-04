import { IsOptional, IsString } from 'class-validator';

export class AttachmentDto {
  @IsOptional()
  @IsString()
  type?: string; // You could use an enum if you know all possible types
}
