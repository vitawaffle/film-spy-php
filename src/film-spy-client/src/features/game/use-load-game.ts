import { gameStartedLoading, gameLoaded } from './game-slice';
import client from 'client';
import { useAppDispatch } from 'hooks';
import type { Game } from 'models';
import { isForbiddenError } from 'utils';

const useLoadGame = (): () => Promise<void> => {
  const dispatch = useAppDispatch();

  const loadGame = async (): Promise<void> => {
    dispatch(gameStartedLoading());

    let game: Game | undefined;

    try {
      game = (await client.get('/api/games/current')).data
    } catch (error) {
      if (isForbiddenError(error))
        game = undefined;
      else
        throw error;
    } finally {
      dispatch(gameLoaded(game));
    }
  };

  return loadGame;
};

export default useLoadGame;
