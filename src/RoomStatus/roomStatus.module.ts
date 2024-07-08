import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomStatus } from './roomStatus.entity';
import { RoomStatusService } from './roomStatus.service';
import { RoomStatusController } from './roomStatus.controller';
@Module({
  imports: [TypeOrmModule.forFeature([RoomStatus])],
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
})
export class RoomStatusModule {}
