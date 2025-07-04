import { IsNumber, IsString, IsOptional } from 'class-validator';

export class ChatDto {
  @IsNumber()
  id: number;

  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  type: string; // could be an enum (e.g., 'private', 'group', etc.)
}
