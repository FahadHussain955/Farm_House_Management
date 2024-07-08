import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new BadRequestException('Invalid email address.');
    }
    if (userData.password.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters long.',
      );
    }
    if (userData.password.length > 100) {
      throw new BadRequestException('Password Should be under 100 characters.');
    }
    const existingEmail = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existingEmail) {
      throw new BadRequestException('Email already exists.');
    }
    const user = new User();
    user.email = userData.email;
    user.roles = userData.roles;
    user.isActive = true;
    user.IsDeleted = false;
    user.CreatedBy = 0;
    user.UpdatedBy = 0;
    user.DeletedBy = 0;
    user.password = await this.hashPassword(userData.password);
    try {
      return this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: number, dto: CreateUserDto) {
    const todo = await this.userRepository.findOne({ where: { id } });
    if (!todo) {
      throw new BadRequestException('The user for this Id could not be found.');
    }
    if (dto.email !== todo.email) {
      const customerWithSamephonenumber = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (customerWithSamephonenumber) {
        throw new BadRequestException('A user with this email already exists.');
      }
    }
    todo.UpdatedAt = new Date();
    todo.UpdatedBy = todo.id;
    const temp = Object.assign(todo, dto);
    return await this.userRepository.save(temp);
  }

  async deleteUser(id: number) {
    const todo = await this.userRepository.findOne({ where: { id } });
    if (!todo) {
      throw new BadRequestException('The user for this Id could not be found.');
    }
    todo.DeletedAt = new Date();
    todo.DeletedBy = todo.id;
    todo.IsDeleted = true;
    return await this.userRepository.save(todo);
  }

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return reject(null);
        }
        bcrypt.hash(password, salt, (err2, hash) => {
          return err2 ? reject(null) : resolve(hash);
        });
      });
    });
  }

  checkPassword(user: User, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(password, user.password, (error, ok) => {
        return error || !ok ? resolve(false) : resolve(true);
      });
    });
  }
}
