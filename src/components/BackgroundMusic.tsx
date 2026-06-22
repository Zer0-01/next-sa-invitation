"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useOpening } from "./OpeningContext";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);
  const { isDismissed, shouldPlayMusic } = useOpening();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncPlayingState = () => {
      setIsPlaying(!audio.paused);
    };

    syncPlayingState();
    audio.addEventListener("play", syncPlayingState);
    audio.addEventListener("pause", syncPlayingState);

    return () => {
      audio.removeEventListener("play", syncPlayingState);
      audio.removeEventListener("pause", syncPlayingState);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isDismissed || !shouldPlayMusic || hasStartedRef.current) return;

    const startPlayback = async () => {
      try {
        await audio.play();
        hasStartedRef.current = true;
        setIsPlaying(true);
        setPlaybackError(false);
      } catch {
        setIsPlaying(false);
        setPlaybackError(true);
      }
    };

    void startPlayback();
  }, [isDismissed, shouldPlayMusic]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      setPlaybackError(false);
      return;
    }

    try {
      await audio.play();
      hasStartedRef.current = true;
      setIsPlaying(true);
      setPlaybackError(false);
    } catch {
      setIsPlaying(false);
      setPlaybackError(true);
    }
  };

  if (!isDismissed) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-50 lg:right-[max(1.25rem,calc(50%-210px+1rem))] lg:bottom-[max(1.25rem,calc(5vh+1rem))]">
      <audio ref={audioRef} src="/song.mp3" loop preload="auto" />

      <motion.button
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => void togglePlay()}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-border/70 bg-card/92 text-primary shadow-[0_14px_34px_rgba(50,61,0,0.14)] backdrop-blur-md transition-colors hover:bg-card"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ${
            isPlaying
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-primary"
          }`}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </span>
        <span className="sr-only">{isPlaying ? "Pause song" : "Play song"}</span>
      </motion.button>

      {isPlaying && (
        <div className="pointer-events-none absolute right-16 bottom-4 flex items-end gap-1">
          {[0, 1, 2].map((bar) => (
            <motion.span
              key={bar}
              animate={{ opacity: [0.35, 1, 0.55], scaleY: [0.5, 1.15, 0.7] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar * 0.14,
              }}
              className="h-4 w-1 origin-bottom rounded-full bg-gold/90"
            />
          ))}
        </div>
      )}

      {playbackError && (
        <p className="mt-2 pr-2 text-right text-[0.68rem] tracking-[0.08em] text-primary/70">
          Tap to start the music.
        </p>
      )}
    </div>
  );
};

export default BackgroundMusic;
