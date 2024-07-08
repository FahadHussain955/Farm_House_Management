import { Room } from 'src/Room/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guestName: string;

  @Column()
  checkInDate: string;

  @Column()
  checkOutDate: string;

  @ManyToOne(() => Room, room => room.id)
  room: number;
}
