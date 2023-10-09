import type Model from './model';
import type User from './user';

type Game = Model & {
  users: User[],
};

export default Game;
