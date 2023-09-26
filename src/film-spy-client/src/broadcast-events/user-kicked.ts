import type { Room, User } from 'models';

type UserKicked = {
  room: Room,
  user: User,
};

export default UserKicked;
