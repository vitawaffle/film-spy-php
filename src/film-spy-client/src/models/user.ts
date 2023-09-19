import type Model from './model';

type User = Model & {
  name: string,
  email: string,
};

export default User;
