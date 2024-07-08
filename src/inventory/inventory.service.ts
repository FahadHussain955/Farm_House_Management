import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import {
  CreateInventoryDto,
  UpdateInventoryDto,
} from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(inventoryData: CreateInventoryDto): Promise<Inventory> {
    if (inventoryData.quantity < 0) {
      throw new BadRequestException('Quantity must be greater then 0.');
    }
    if (inventoryData.itemName.length < 3) {
      throw new BadRequestException(
        'Item Name should be minimum 3 characters long.',
      );
    }
    const inventory = new Inventory();
    inventory.itemName = inventoryData.itemName;
    inventory.quantity = inventoryData.quantity;
    try {
      return this.inventoryRepository.save(inventory);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }

  findOne(id: number): Promise<Inventory> {
    return this.inventoryRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    await this.inventoryRepository.update(id, updateInventoryDto);
    return this.inventoryRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
}
