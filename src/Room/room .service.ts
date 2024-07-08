import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(roomData: CreateRoomDto): Promise<Room> {
    const room = new Room();
    room.number = roomData.number;
    room.isAvailable = roomData.isAvailable;
    try {
      return this.roomRepository.save(room);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.roomRepository.update(id, updateRoomDto);
    return this.roomRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
