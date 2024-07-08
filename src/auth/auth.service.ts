import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { LoginCredential } from './dto/login-credential.dto';
import { TokenDto } from './dto/token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './entities/refresh-token.repo';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  async login(credential: LoginCredential): Promise<any> {
    const user = await this.userService.getUserByEmail(credential.email);
    if (!user) {
      throw new Error('Invalid email address');
    }
    const isMatched = await this.userService.checkPassword(
      user,
      credential.password,
    );
    if (!isMatched) {
      throw new Error(
        'The provided email or password does not match our records.',
      );
    }
    if (!user.isActive) {
      throw new Error('Inactive user');
    }
    const authToken: TokenDto = this.generateAuthToken(user);
    this.createRefreshToken(user);
    return { authToken, user };
  }

  async createRefreshToken(user: User): Promise<RefreshToken> {
    const { refreshToken } = this.generateAuthToken(user);
    const reftoken = new RefreshToken();
    reftoken.userId = user.id;
    reftoken.token = refreshToken;
    return await this.refreshTokenRepository.save(reftoken);
  }

  async refreshToken(token: RefreshTokenDto): Promise<TokenDto> {
    let payload: any;
    try {
      payload = this.jwtService.verify(token.refreshToken);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
    const { id, type } = payload;
    if (type !== 'refresh') {
      throw new Error('Wrong token type');
    }
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new Error('Invalid user');
    }
    if (!user.isActive) {
      throw new Error('Inactive user');
    }
    const authToken = this.generateAuthToken(user);
    return Promise.resolve(authToken);
  }

  private generateAuthToken(user: User): TokenDto {
    const accessToken = this.jwtService.sign(
      {
        sub: () => user.email,
        type: 'access',
        email: user.email,
        userId: user.id,
      },
      {
        expiresIn: '1m',
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        sub: () => user.email,
        type: 'refresh',
        userId: user.id,
      },
      {
        expiresIn: '60m',
      },
    );
    return { accessToken, refreshToken };
  }
}
