import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './Room/room.module';
import { ReservationModule } from './room_reservation/reserve.module';
import { RoomStatusModule } from './RoomStatus/roomStatus.module';
import { InventoryModule } from './inventory/inventory.module';
import { CleaningChecklistModule } from './Cleaning-Check/cleaning-checklist.module';
import { NotificationModule } from './Notification/notification.module';
import { ReportsModule } from './Reports/report.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...typeOrmModuleOptions,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    RoomModule,
    ReservationModule,
    RoomStatusModule,
    InventoryModule,
    CleaningChecklistModule,
    NotificationModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
