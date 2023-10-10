import type Model from './model';
import type Room from './room';
import type User from './user';

type Game = Model & {
  room: Room,
  users: User[],
};

export default Game;
