import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  number: string;

  @IsBoolean()
  isAvailable: boolean;
}

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  number?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
