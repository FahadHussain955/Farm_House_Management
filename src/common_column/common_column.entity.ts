import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export class CommonColumns {
  @Exclude()
  @Column({ name: 'IsDeleted' })
  IsDeleted: boolean;

  @Exclude()
  @CreateDateColumn({ name: 'CreatedAt' })
  CreatedAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'UpdatedAt' })
  UpdatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'DeletedAt' })
  DeletedAt: Date;

  @Exclude()
  @Column({ name: 'CreatedBy' })
  CreatedBy: number;

  @Exclude()
  @Column({ name: 'UpdatedBy' })
  UpdatedBy: number;

  @Exclude()
  @Column({ name: 'DeletedBy' })
  DeletedBy: number;
}
