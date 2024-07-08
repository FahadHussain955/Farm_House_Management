import { IsString, IsDateString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  createdDate: string;
}

export class UpdateReportDto {
  @IsString()
  title?: string;

  @IsString()
  content?: string;

  @IsDateString()
  createdDate?: string;
}
