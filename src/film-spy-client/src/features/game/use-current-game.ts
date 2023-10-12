import useCurrentGameId from './use-current-game-id';
import { selectGames } from 'features/games';
import type { Game } from 'models';
import { useSelector } from 'store';

const useCurrentGame = (): Game => {
  const games = useSelector(selectGames);
  const currentGameId = useCurrentGameId();

  return games.find(game => game.id === currentGameId) as Game;
};

export default useCurrentGame;
