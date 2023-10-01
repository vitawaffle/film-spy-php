import type Model from './model';
import type User from './user';

type Room = Model & {
  name: string,
  owner: User,
  usersCount: number,
};

export default Room;
