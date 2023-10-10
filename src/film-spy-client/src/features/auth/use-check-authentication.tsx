import { authenticationCheckStarted, authenticated, unauthenticated } from './auth-slice';
import client from 'client';
import { gamesLoaded } from 'features/games/games-slice';
import { joinedRoomsLoaded, ownedRoomsLoaded } from 'features/rooms/rooms-slice';
import type { User } from 'models';
import { useDispatch } from 'store';
import { isUnauthenticatedError } from 'utils';
import useEmailNotVerifiedSnackbar from './use-email-not-verified-snackbar';

const useCheckAuthentication = (): () => Promise<boolean> => {
  const dispatch = useDispatch();
  const enqueueEmailNotVerified = useEmailNotVerifiedSnackbar();

  return async (): Promise<boolean> => {
    dispatch(authenticationCheckStarted());

    try {
      const user = (await client.get<User>('/api/users/me')).data;

      dispatch(authenticated(user));
      dispatch(joinedRoomsLoaded(user.rooms));
      dispatch(ownedRoomsLoaded(user.ownedRooms));
      dispatch(gamesLoaded(user.games));

      if (user.emailVerifiedAt === undefined || user.emailVerifiedAt === null)
        enqueueEmailNotVerified();

      return true;
    } catch (error: unknown) {
      dispatch(unauthenticated());

      if (isUnauthenticatedError(error))
        return false;

      throw error;
    }
  };
};

export default useCheckAuthentication;
