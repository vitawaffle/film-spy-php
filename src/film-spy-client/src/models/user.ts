import type Game from './game';
import type Model from './model';
import type Room from './room';

type User = Model & {
  name: string,
  email: string,
  rooms: Room[],
  ownedRooms: Room[],
  emailVerifiedAt?: Date,
  games: Game[],
};

export default User;
