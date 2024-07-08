import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reserve.entity';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/create-reserve.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async create(reserveData: CreateReservationDto): Promise<Reservation> {
    if (reserveData.guestName.length < 3) {
      throw new BadRequestException(
        'Guest name should be minimum 3 characters long.',
      );
    }
    const reserve = new Reservation();
    reserve.guestName = reserveData.guestName;
    reserve.checkInDate = reserveData.checkInDate;
    reserve.checkOutDate = reserveData.checkOutDate;
    reserve.room = reserveData.roomId;
    try {
      return this.reservationRepository.save(reserve);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  findOne(id: number): Promise<Reservation> {
    return this.reservationRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    await this.reservationRepository.update(id, updateReservationDto);
    return this.reservationRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
