import { useNavigate } from 'react-router-dom';

import { selectRoom, userJoined, userLeft, userKicked } from 'app-slice';
import type { UserJoinedRoom, UserKicked, UserLeftRoom } from 'broadcast-events';
import { useAppDispatch, useAppSelector } from 'hooks';

const useListenRoomChannel = (): {
  listenRoomChannel: () => void,
  stopListeningRoomChannel: () => void,
} => {
  const room = useAppSelector(selectRoom);
  const dispatch = useAppDispatch();

  const handleUserJoinedRoom = ({ user }: UserJoinedRoom): void => {
    /* Debug */
    console.log('UserJoinedRoom:');
    console.log(user);
    /* ***** */

    dispatch(userJoined(user));
  };

  const handleUserLeftRoom = ({ user }: UserLeftRoom): void => {
    /* Debug */
    console.log('UserLeftRoom:');
    console.log(user);
    /* ***** */

    dispatch(userLeft(user));
  };

  const handleUserKicked = ({ user }: UserKicked): void => {
    /* Debug */
    console.log('UserKicked:');
    console.log(user);
    /* ***** */

    dispatch(userKicked(user));
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
