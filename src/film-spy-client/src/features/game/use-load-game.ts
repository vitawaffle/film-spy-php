import { gameLoadingStarted, gameLoaded } from 'app-slice';
import client from 'client';
import { useAppDispatch } from 'hooks';
import type { Game } from 'models';
import { isForbiddenError } from 'utils';

const useLoadGame = (): () => Promise<void> => {
  const dispatch = useAppDispatch();

  return async (): Promise<void> => {
    dispatch(gameLoadingStarted());

    let game: Game | undefined;

    try {
      game = (await client.get('/api/games/current')).data;
    } catch (error) {
      if (isForbiddenError(error))
        game = undefined;
      else
        throw error;
    } finally {
      dispatch(gameLoaded(game));
    }
  };
};

export default useLoadGame;
