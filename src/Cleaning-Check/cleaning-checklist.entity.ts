import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CleaningChecklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column()
  isCompleted: boolean;
}
