import type { Model, Room } from 'models';

type User = Model & {
  email: string,
  name?: string,
  room?: Room,
};

export default User;
