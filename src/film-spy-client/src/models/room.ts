import type { Model } from 'models';

type Room = Model & {
  name: string,
  user_id: number,
};

export default Room;
