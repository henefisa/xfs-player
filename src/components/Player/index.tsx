import { FC, memo, useEffect, useRef, useState } from "react";
import Volume from "./Volume";
import Progress from "./Progress";
import Timer from "./Timer";
import PlayerContext from "@/context/player";
import "./style.less";
interface PlayerProps {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
}

const Player: FC<PlayerProps> = ({
  src,
  controls = false,
  autoPlay = false,
}) => {
  const [isPlay, setIsPlay] = useState<boolean>(autoPlay);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoStatus = () => {
    setIsPlay((play) => !play);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .catch((err) =>
          console.log(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          )
        );
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      return;
    }
    videoRef.current?.pause();
  }, [isPlay]);

  return (
    <PlayerContext.Provider
      value={{
        playerRef: videoRef,
        playing: isPlay,
        setPlaying: setIsPlay,
      }}
    >
      <div className="player-container" ref={containerRef}>
        <video
          className="player hide-controls"
          ref={videoRef}
          onClick={handleVideoStatus}
          autoPlay={false}
        >
          <source src={src} />
        </video>
        {controls && (
          <div className="player__controls">
            <Progress />
            <div className="player__actions">
              <div className="player__actions--left">
                <button
                  className="player__button"
                  onClick={handleVideoStatus}
                  title={isPlay ? "Pause" : "Play"}
                >
                  <svg viewBox="0 0 36 36">
                    <path
                      className="fill-white"
                      d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
                    />
                  </svg>
                </button>
                <Volume />
                <Timer />
              </div>
              <div className="player__actions--right">
                <button className="player__button" onClick={toggleFullscreen}>
                  <svg height="100%" viewBox="0 0 36 36" width="100%">
                    <path
                      className="fill-white"
                      d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
                    ></path>
                    <path
                      className="fill-white"
                      d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
                    ></path>
                    <path
                      className="fill-white"
                      d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
                    ></path>
                    <path
                      className="fill-white"
                      d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlayerContext.Provider>
  );
};

export default memo(Player);
