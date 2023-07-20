import type { Model, Room, User } from 'models';

type Game = Model & {
  room: Room,
  users: User[],
};

export default Game;
