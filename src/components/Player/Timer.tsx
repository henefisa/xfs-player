import { usePlayerContext } from "@/context/player";
import { FC, memo, useEffect, useRef, useState } from "react";

interface TimerProps {}

const Timer: FC<TimerProps> = ({}) => {
  const { playerRef } = usePlayerContext();
  const ref = useRef({ currentTime: 0, duration: 0 });

  const handleTimeUpdate = () => {
    if (!playerRef?.current) return;
    ref.current.currentTime = playerRef.current.currentTime;
    ref.current.duration = playerRef.current.duration;
  };

  useEffect(() => {
    playerRef?.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      playerRef?.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="timer">
      <span className="timer__current">{ref.current.currentTime}</span>
      <span className="timer__duration">{ref.current.duration}</span>
    </div>
  );
};

export default memo(Timer);
