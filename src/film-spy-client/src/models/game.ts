import type Model from './model';
import type User from './user';

type Game = Model & {
  name: string,
  users: User[],
};

export default Game;
