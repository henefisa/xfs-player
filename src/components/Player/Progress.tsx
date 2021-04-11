import { usePlayerContext } from "@/context/player";
import { FC, memo, useEffect, useRef } from "react";

interface ProgressProps {}

const Progress: FC<ProgressProps> = ({}) => {
  const { playerRef, setPlaying } = usePlayerContext();
  const progressRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const updateBarWidth = () => {
    if (!playerRef?.current || !progressBarRef.current) return;
    const current = playerRef.current.currentTime;
    const duration = playerRef.current.duration;
    progressBarRef.current.style.width = `${(current / duration) * 100}%`;
  };

  const handleChangeTime = (e: MouseEvent) => {
    if (!progressRef.current || !playerRef?.current || !progressBarRef.current)
      return;
    const progressRect = progressRef.current.getBoundingClientRect();
    let n = e.clientX - progressRect.left;
    if (n < 0) n = 0;
    if (n > progressRect.width) n = progressRect.width;
    playerRef.current.currentTime =
      (n / progressRect.width) * playerRef.current.duration;
    updateBarWidth();
  };

  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleChangeTime);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleChangeTime);
    });
  };

  useEffect(() => {
    progressBarRef.current?.addEventListener("click", handleChangeTime);
  }, []);

  useEffect(() => {
    playerRef?.current?.addEventListener("timeupdate", updateBarWidth);

    return () => {
      playerRef?.current?.removeEventListener("timeupdate", updateBarWidth);
    };
  }, []);

  return (
    <div
      className="player__progress"
      onMouseDown={handleMouseDown}
      ref={progressRef}
    >
      <div className="player__progress-bar" ref={progressBarRef} />
    </div>
  );
};

export default memo(Progress);
