import { usePlayerContext } from "@/context/player";
import { FC, memo, useEffect, useRef } from "react";
import "./style.less";

interface VolumeProps {}

const Volume: FC<VolumeProps> = ({}) => {
  const { playerRef } = usePlayerContext();

  const volumeThumbRef = useRef<HTMLDivElement | null>(null);
  const volumeTrackRef = useRef<HTMLDivElement | null>(null);

  const handleChangeVolume = (e: MouseEvent) => {
    if (
      !volumeTrackRef.current ||
      !volumeThumbRef.current ||
      !playerRef?.current
    )
      return;

    const trackRect = volumeTrackRef.current.getBoundingClientRect();
    const thumbRect = volumeThumbRef.current.getBoundingClientRect();
    let n = e.clientX - trackRect.left - thumbRect.width / 2;
    if (n < 0) n = 0;
    if (n > trackRect.width - thumbRect.width)
      n = trackRect.width - thumbRect.width;
    volumeThumbRef.current.style.left = `${n}px`;
    const volume = n / (trackRect.width - thumbRect.width);
    playerRef.current.volume = volume;
  };

  useEffect(() => {
    volumeTrackRef.current?.addEventListener("click", handleChangeVolume);
  }, []);

  const handleVolumeMouseDown = () => {
    window.addEventListener("mousemove", handleChangeVolume);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleChangeVolume);
    });
  };

  return (
    <div className="player__volume">
      <div
        className="player__volume-track"
        ref={volumeTrackRef}
        onMouseDown={handleVolumeMouseDown}
      >
        <div className="player__volume-thumb" ref={volumeThumbRef}></div>
      </div>
    </div>
  );
};

export default memo(Volume);
