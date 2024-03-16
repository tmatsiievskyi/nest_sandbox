import { Test, TestingModule } from '@nestjs/testing';
import User from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { UsersRepo } from '../users.repo';

const mockUserRepo = {
  getByEmail: jest.fn(),
};

describe('UserService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepo,
          useValue: mockUserRepo,
        },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
  });
  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      it('should return the user', async () => {
        const user: User = {
          name: 'test',
          id: 1,
          email: 'test@test.com',
          password: 'test123',
        };
        mockUserRepo.getByEmail.mockReturnValue(Promise.resolve(user));
        expect(await usersService.getByEmail('test@test.com')).toEqual(user);
        expect(mockUserRepo.getByEmail).toHaveBeenCalledWith(user.email);
      });
    });
  });
});
