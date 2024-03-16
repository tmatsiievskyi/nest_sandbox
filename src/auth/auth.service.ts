import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/postgresErrorCode.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import { AuthRepo } from './auth.repo';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authRepo: AuthRepo,
  ) {}

  public async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registerData,
        password: hashedPassword,
      });
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with this email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async validateUser(authData: Omit<RegisterDto, 'name'>) {
    console.log(authData);
    const user = await this.authRepo.getByEmail(authData.email);
    await this.verifyPassword(authData.password, user.password);
    if (user) {
      return user;
    }
    throw new HttpException('Wrong credential', HttpStatus.BAD_REQUEST);
  }

  private async verifyPassword(password, hashedPassword) {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
