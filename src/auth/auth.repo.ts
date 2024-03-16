import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepo {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async getByEmail(email: string) {
    return await this.usersRepo.findOneBy({ email: email });
  }
}
