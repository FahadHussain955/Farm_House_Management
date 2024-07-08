import { Logger, Module, forwardRef } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import RefreshTokens from './entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokens]),
    forwardRef(() => UserModule),
    forwardRef(() => SharedModule),
  ],

  providers: [AuthService, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
