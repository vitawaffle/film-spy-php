import type { UserJoinedRoom, UserLeftRoom } from 'broadcast-events';
import { selectCurrentRoom, userJoinedRoom, userLeftRoom } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';

const useListenRoomChannel = (): {
  listenRoomChannel: () => void,
  stopListeningRoomChannel: () => void,
} => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const dispatch = useAppDispatch();

  const handleUserJoinedRoom = ({ user }: UserJoinedRoom): void => {
    /* Debug */
    console.log('UserJoinedRoom:');
    console.log(user);
    /* ***** */

    dispatch(userJoinedRoom(user));
  };

  const handleUserLeftRoom = ({ user }: UserLeftRoom): void => {
    /* Debug */
    console.log('UserLeftRoom:');
    console.log(user);
    /* ***** */

    dispatch(userLeftRoom(user));
  };

  const listenRoomChannel = (): void => {
    window.Echo.private('rooms.' + currentRoom?.id ?? 0)
      .listen('UserJoinedRoom', handleUserJoinedRoom)
      .listen('UserLeftRoom', handleUserLeftRoom);
  };

  const stopListeningRoomChannel = (): void => {
    window.Echo.private('rooms.' + currentRoom?.id ?? 0)
      .stopListening('UserJoinedRoom')
      .stopListening('UserLeftRoom');
  };

  return { listenRoomChannel, stopListeningRoomChannel };
};

export default useListenRoomChannel;
