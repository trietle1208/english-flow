"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Pause,
  Play,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatClockTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

type AudioPlayerProps = {
  src: string;
  title: string;
  /** Notifies transcript highlighting when currentTime changes. */
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
};

/**
 * Custom listening player (spec §18 / §31): play/pause, seek, volume,
 * playback speed, and full keyboard control. No extra audio libraries.
 */
export function AudioPlayer({
  src,
  title,
  onTimeUpdate,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekTrackRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      if (!seeking) {
        setCurrentTime(audio.currentTime);
        onTimeUpdate?.(audio.currentTime);
      }
    };
    const handleLoaded = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("durationchange", handleLoaded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("durationchange", handleLoaded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onTimeUpdate, seeking]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  }, []);

  const seekTo = useCallback(
    (next: number) => {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }
      const clamped = Math.min(Math.max(0, next), duration || audio.duration || 0);
      audio.currentTime = clamped;
      setCurrentTime(clamped);
      onTimeUpdate?.(clamped);
    },
    [duration, onTimeUpdate],
  );

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const track = seekTrackRef.current;
      if (!track || duration <= 0) {
        return;
      }
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      seekTo(ratio * duration);
    },
    [duration, seekTo],
  );

  const onSeekPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setSeeking(true);
    seekFromClientX(event.clientX);
  };

  const onSeekPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!seeking) {
      return;
    }
    seekFromClientX(event.clientX);
  };

  const onSeekPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setSeeking(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget && (event.target as HTMLElement).tagName === "BUTTON") {
      // Let focused buttons handle their own keys; Space on the shell still toggles.
    }

    switch (event.key) {
      case " ":
      case "Spacebar":
        event.preventDefault();
        togglePlay();
        break;
      case "ArrowLeft":
        event.preventDefault();
        seekTo(currentTime - 5);
        break;
      case "ArrowRight":
        event.preventDefault();
        seekTo(currentTime + 5);
        break;
      case "ArrowUp":
        event.preventDefault();
        setMuted(false);
        setVolume((v) => Math.min(1, Math.round((v + 0.1) * 10) / 10));
        break;
      case "ArrowDown":
        event.preventDefault();
        setVolume((v) => Math.max(0, Math.round((v - 0.1) * 10) / 10));
        break;
      default:
        break;
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      role="region"
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "w-full rounded-xl border bg-card p-4 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      <p id={labelId} className="sr-only">
        Audio player for {title}
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            size="lg"
            className="min-h-12 min-w-12 shrink-0"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="size-5" aria-hidden="true" />
            ) : (
              <Play className="size-5" aria-hidden="true" />
            )}
          </Button>

          <div className="min-w-0 flex-1 space-y-2">
            <div
              ref={seekTrackRef}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration) || 0}
              aria-valuenow={Math.round(currentTime)}
              aria-valuetext={`${formatClockTime(currentTime)} of ${formatClockTime(duration)}`}
              onPointerDown={onSeekPointerDown}
              onPointerMove={onSeekPointerMove}
              onPointerUp={onSeekPointerUp}
              onPointerCancel={onSeekPointerUp}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  seekTo(currentTime - 5);
                } else if (event.key === "ArrowRight") {
                  event.preventDefault();
                  seekTo(currentTime + 5);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  seekTo(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  seekTo(duration);
                }
              }}
              className="relative flex h-10 cursor-pointer items-center touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="absolute inset-x-0 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow"
                style={{ left: `${progress}%` }}
                aria-hidden="true"
              />
            </div>
            <div className="flex justify-between text-xs tabular-nums text-muted-foreground">
              <span>{formatClockTime(currentTime)}</span>
              <span>{formatClockTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
            >
              <VolumeIcon className="size-4" aria-hidden="true" />
            </Button>
            <label className="sr-only" htmlFor={`${labelId}-volume`}>
              Volume
            </label>
            <input
              id={`${labelId}-volume`}
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(event) => {
                const next = Number(event.target.value);
                setVolume(next);
                setMuted(next === 0);
              }}
              aria-label="Volume"
              className="h-2 w-24 max-w-full cursor-pointer accent-primary sm:w-32"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Playback speed">
            {SPEEDS.map((value) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={speed === value ? "default" : "outline"}
                className="min-h-10 min-w-14"
                aria-label={`Playback speed ${value} times`}
                aria-pressed={speed === value}
                onClick={() => setSpeed(value)}
              >
                {value}×
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
