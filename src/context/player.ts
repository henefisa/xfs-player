import { createContext, RefObject, useContext } from "react";

interface IPlayerContext {
  playerRef: RefObject<HTMLVideoElement> | null;
  playing: boolean;
  setPlaying: (...args: any) => void;
}

const PlayerContext = createContext<IPlayerContext>({
  playerRef: null,
  playing: false,
  setPlaying: () => {},
});

const usePlayerContext = () => useContext(PlayerContext);

export { PlayerContext as default, usePlayerContext };
