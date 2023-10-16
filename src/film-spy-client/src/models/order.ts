import Model from './model';

type Order = Model & {
  userId: number,
  order: number,
};

export default Order;
