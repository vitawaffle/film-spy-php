import type { Model, Room, User } from 'models';

type Game = Model & {
  room: Room,
  users: User[],
  is_spy: boolean,
};

export default Game;
