import { MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  readonly email: string;

  @MinLength(8)
  @MaxLength(100)
  readonly password: string;

  @IsNotEmpty()
  readonly roles: UserRole[];
}
