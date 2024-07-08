import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoomStatusDto {
    @IsNumber()
    roomId: number;

    @IsString()
    status: string;
  }
  
  export class UpdateRoomStatusDto {
    @IsString()
    @IsOptional()
    status?: string;
  }
  