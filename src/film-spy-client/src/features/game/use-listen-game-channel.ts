import useCurrentGameId from './use-current-game-id';

const useListenGameChannel = (): { listenGameChannel: () => void, stopListeningGameChannel: () => void } => {
  const currentGameId = useCurrentGameId();
  const url = `games.${currentGameId}`;

  return {
    listenGameChannel: (): void => {
      /* Debug */
      console.log(`Start listening ${url} channel`);
      /* ***** */

      window.Echo.private(url);
    },
    stopListeningGameChannel: (): void => {
      /* Debug */
      console.log(`End listening ${url} channel`);
      /* ***** */

      window.Echo.private(url);
    },
  };
};

export default useListenGameChannel;
