import type Model from './model';
import type Game from './game';
import type User from './user';

type Order = Model & {
  game: Game,
  user: User,
  order: number,
};

export default Order;
