import type Model from './model';
import type Room from './room';

type User = Model & {
  name: string,
  email: string,
  rooms: Room[],
  emailVerifiedAt?: Date,
};

export default User;
