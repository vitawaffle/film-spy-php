import type { Model, User } from 'models';

type Room = Model & {
  name: string,
  user: User,
  users_count: number,
};

export default Room;
