import User from '../../users/user.entity';
import * as bcrypt from 'bcrypt';
import { mockedUser } from './user.mock';
import { Test } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from 'src/utils/mocks/config.service';
import { JwtService } from '@nestjs/jwt';
import { mockedJwtService } from 'src/utils/mocks/jwt.service';
import { UsersRepo } from '../../users/users.repo';

describe('The AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let bcryptCompare: jest.Mock;
  let userData: User;
  let findUser: jest.Mock;

  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };

    findUser = jest.fn().mockReturnValue(userData);

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const mockUserRepo = {
      findOne: findUser,
    };

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: UsersRepo,
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
    usersService = await module.get<UsersService>(UsersService);
  });

  describe('when accessing the data of authentication user ', () => {
    it('should attempt to get a user by email', async () => {
      const getByEmailSpy = jest.spyOn(usersService, 'getByEmail');
      await authService.validateUser({
        email: 'test@test.com',
        password: 'password',
      });
      expect(getByEmailSpy).toBeCalledTimes(1);
    });
  });

  //   describe('when accessing the data of auth user', () => {
  //     describe('and provided password is not valid', () => {
  //         beforeEach(() => {
  //             bcryptCompare.mockReturnValue(false)
  //         })
  //         it('should throw an error', async () => {
  //             await expect(
  //                 a
  //             )
  //         })
  //     })
  //   })
});
