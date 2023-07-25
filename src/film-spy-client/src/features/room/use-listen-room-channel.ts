import { useNavigate } from 'react-router-dom';

import { selectRoom, selectUser } from 'app-slice';
import type { UserJoinedRoom, UserKicked, UserLeftRoom } from 'broadcast-events';
import { userJoinedRoom, userLeftRoom, userKicked } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { User } from 'models';

const useListenRoomChannel = (): {
  listenRoomChannel: () => void,
  stopListeningRoomChannel: () => void,
} => {
  const room = useAppSelector(selectRoom);
  const currentUser = useAppSelector(selectUser);
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

  const handleUserKicked = ({ user }: UserKicked): void => {
    /* Debug */
    console.log('UserKicked:');
    console.log(user);
    /* ***** */

    dispatch(userKicked({ kickedUser: user, currentUser: currentUser as User }));
  };

  const navigate = useNavigate();

  const handleGameStarted = (): void => {
    /* Debug */
    console.log('GameStarted');
    /* ***** */

    navigate('/game');
  };

  const listenRoomChannel = (): void => {
    if (room) {
      window.Echo.private('rooms.' + room.id ?? 0)
        .listen('UserJoinedRoom', handleUserJoinedRoom)
        .listen('UserLeftRoom', handleUserLeftRoom)
        .listen('UserKicked', handleUserKicked)
        .listen('GameStarted', handleGameStarted);
    }
  };

  const stopListeningRoomChannel = (): void => {
    if (room) {
      window.Echo.private('rooms.' + room.id ?? 0)
        .stopListening('UserJoinedRoom')
        .stopListening('UserLeftRoom')
        .stopListening('UserKicked')
        .stopListening('GameStarted');
    }
  };

  return { listenRoomChannel, stopListeningRoomChannel };
};

export default useListenRoomChannel;
