import { IsString, IsBoolean } from 'class-validator';

export class CreateCleaningChecklistDto {
  @IsString()
  task: string;

  @IsBoolean()
  isCompleted: boolean;
}

export class UpdateCleaningChecklistDto {
  @IsString()
  task: string;

  @IsBoolean()
  isCompleted: boolean;
}
