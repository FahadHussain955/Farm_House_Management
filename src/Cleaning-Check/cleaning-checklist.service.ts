import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CleaningChecklist } from './cleaning-checklist.entity';
import {
  CreateCleaningChecklistDto,
  UpdateCleaningChecklistDto,
} from './dto/create-clean-check.dto';

@Injectable()
export class CleaningChecklistService {
  constructor(
    @InjectRepository(CleaningChecklist)
    private cleaningChecklistRepository: Repository<CleaningChecklist>,
  ) {}

  async create(
    cleaningCheckData: CreateCleaningChecklistDto,
  ): Promise<CleaningChecklist> {
    const cleaningCheck = new CleaningChecklist();
    cleaningCheck.task = cleaningCheckData.task;
    cleaningCheck.isCompleted = cleaningCheckData.isCompleted;
    try {
      return this.cleaningChecklistRepository.save(cleaningCheck);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<CleaningChecklist[]> {
    return this.cleaningChecklistRepository.find();
  }

  findOne(id: number): Promise<CleaningChecklist> {
    return this.cleaningChecklistRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCleaningChecklistDto: UpdateCleaningChecklistDto,
  ): Promise<CleaningChecklist> {
    await this.cleaningChecklistRepository.update(
      id,
      updateCleaningChecklistDto,
    );
    return this.cleaningChecklistRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.cleaningChecklistRepository.delete(id);
  }
}
