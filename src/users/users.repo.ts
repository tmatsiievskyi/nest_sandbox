import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UsersRepo {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    return await this.usersRepo.findOneBy({ email: email });
  }

  async getById(id: number) {
    return await this.usersRepo.findOneBy({ id: id });
  }

  async createUser(userData: CreateUserDto) {
    const newUser = await this.usersRepo.create(userData);
    return await this.usersRepo.save(newUser);
  }

  async deleteUser(id: number) {
    return this.usersRepo.delete(id);
  }
}
