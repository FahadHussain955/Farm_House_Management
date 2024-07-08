import { Room } from 'src/Room/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class RoomStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Room)
  room: number;

  @Column()
  status: string; // e.g., 'clean', 'dirty', 'occupied'
}
