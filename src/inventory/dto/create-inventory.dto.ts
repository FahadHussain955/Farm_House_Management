import { IsString, IsInt } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  itemName: string;

  @IsInt()
  quantity: number;
}

export class UpdateInventoryDto {
  @IsString()
  itemName: string;

  @IsInt()
  quantity: number;
}
