import {
  Injectable,
  HttpStatus,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async getByEmail(email: string) {
    const user = await this.usersRepo.getByEmail(email);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepo.getById(id);

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepo.createUser(userData);
    if (newUser) {
      return newUser;
    }
  }

  async deleteUser(id: number) {
    const deleteResp = await this.usersRepo.deleteUser(id);
    if (!deleteResp.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
