import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredential } from './dto/login-credential.dto';
import { TokenDto } from './dto/token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly service: AuthService,
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      return await this.service.registerUser(userDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() credential: LoginCredential): Promise<TokenDto> {
    try {
      return await this.service.login(credential);
    } catch (error) {
      this.logger.warn('Login attempt failed', credential);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: RefreshTokenDto): Promise<TokenDto> {
    try {
      return this.service.refreshToken(token);
    } catch (error) {
      this.logger.warn('Refresh token attempt failed', token);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
