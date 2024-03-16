import User from 'src/users/user.entity';

export const mockedUser: User = {
  id: 1,
  email: 'test@test.com',
  name: 'test Name',
  password: 'hash',
  address: {
    id: 1,
    street: 'test street',
    city: 'test city',
    country: 'test country',
  },
};
