import type { Model, Room, Game } from 'models';

type User = Model & {
  email: string,
  name?: string,
  room?: Room,
  game?: Game,
};

export default User;
