import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CleaningChecklist } from './cleaning-checklist.entity';
import { CleaningChecklistController } from './cleaning-checklist.controller';
import { CleaningChecklistService } from './cleaning-checklist.service';
@Module({
  imports: [TypeOrmModule.forFeature([CleaningChecklist])],
  controllers: [CleaningChecklistController],
  providers: [CleaningChecklistService],
})
export class CleaningChecklistModule {}
