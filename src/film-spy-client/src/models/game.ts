import type Model from './model';
import type Order from './order';
import type User from './user';

type Game = Model & {
  name: string,
  users: User[],
  orders: Order[],
};

export default Game;
