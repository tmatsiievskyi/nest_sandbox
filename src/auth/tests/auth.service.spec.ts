import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { mockConfigService } from '../../utils/mocks/config.service';
import { mockedJwtService } from '../../utils/mocks/jwt.service';
import { UsersRepo } from '../../users/users.repo';
import { AuthRepo } from '../auth.repo';

describe('The AuthenticationService', () => {
  let authService: AuthService;
  beforeEach(async () => {
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
          useValue: {},
        },
        {
          provide: AuthRepo,
          useValue: {},
        },
      ],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
  });
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(typeof authService.getCookieWithJwtToken(userId)).toEqual(
        'string',
      );
    });
  });
});
