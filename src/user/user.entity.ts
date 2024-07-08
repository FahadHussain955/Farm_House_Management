import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonColumns } from 'src/common_column/common_column.entity';
export type UserRole = 'admin' | 'user';

@Entity('User')
export class User extends CommonColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['email'])
  @Column({ length: 225, nullable: false })
  email: string;

  @Exclude()
  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column('simple-array')
  roles: UserRole[];
}
