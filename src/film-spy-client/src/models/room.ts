import type Model from './model';
import type User from './user';

type Room = Model & {
  name: string,
  owner: User,
  users_count: number,
};

export default Room;
