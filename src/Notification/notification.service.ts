import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  
  async create(
    notificationData: CreateNotificationDto,
  ): Promise<Notification> {
    const notification = new Notification();
    notification.message = notificationData.message;
    notification.date = notificationData.date;
    try {
      return this.notificationRepository.save(notification);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  findOne(id: number): Promise<Notification> {
    return this.notificationRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    await this.notificationRepository.update(id, updateNotificationDto);
    return this.notificationRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
