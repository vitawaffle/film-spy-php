import type { Model, Order, Room, User } from 'models';

type Game = Model & {
  room: Room,
  users: User[],
  is_spy: boolean,
  orders: Order[],
};

export default Game;
