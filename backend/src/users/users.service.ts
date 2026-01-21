import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CREATE USER
  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  // GET ALL USERS (excluding soft-deleted)
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // GET USER BY ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // UPDATE USER (PATCH)
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    Object.assign(user, dto);

    return this.userRepository.save(user);
  }

  // SOFT DELETE USER
  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return { message: 'User deleted successfully' };
  }
}
