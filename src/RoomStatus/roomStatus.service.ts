import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomStatus } from './roomStatus.entity';
import {
  CreateRoomStatusDto,
  UpdateRoomStatusDto,
} from './dto/create-roomStatus.dto';

@Injectable()
export class RoomStatusService {
  constructor(
    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,
  ) {}

  async create(roomStatusData: CreateRoomStatusDto): Promise<RoomStatus> {
    const roomStatus = new RoomStatus();
    roomStatus.status = roomStatusData.status;
    roomStatus.room = roomStatusData.roomId;
    try {
      return this.roomStatusRepository.save(roomStatus);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<RoomStatus[]> {
    return this.roomStatusRepository.find();
  }

  findOne(id: number): Promise<RoomStatus> {
    return this.roomStatusRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateRoomStatusDto: UpdateRoomStatusDto,
  ): Promise<RoomStatus> {
    await this.roomStatusRepository.update(id, updateRoomStatusDto);
    return this.roomStatusRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.roomStatusRepository.delete(id);
  }
}
