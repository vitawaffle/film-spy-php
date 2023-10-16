import { gameLoadingStarted, gameLoaded } from './game-slice';
import useCurrentGameId from './use-current-game-id';
import client from 'client';
import type { Game } from 'models';
import { useDispatch } from 'store';

const useLoadGame = (): () => Promise<Game> => {
  const dispatch = useDispatch();
  const currentGameId = useCurrentGameId(); 

  return async (): Promise<Game> => {
    dispatch(gameLoadingStarted());

    const game = (await client.get<Game>(`/api/games/${currentGameId}`)).data;

    dispatch(gameLoaded(game));

    return game;
  };
};

export default useLoadGame;
