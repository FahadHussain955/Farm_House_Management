import { IsString, IsDateString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  message: string;

  @IsDateString()
  date: string;
}

export class UpdateNotificationDto {
  @IsString()
  message?: string;

  @IsDateString()
  date?: string;
}
