"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundMusic = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay prevented or audio error:", err);
                setIsPlaying(false);
            }
        };

        if (hasInteracted) {
            playAudio();
        }

        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                playAudio();
            }
        };

        window.addEventListener("click", handleInteraction);
        window.addEventListener("scroll", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);

        return () => {
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!audioRef.current) return;

        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio
                ref={audioRef}
                src="/song.mp3"
                loop
                preload="auto"
            />

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
            >
                <button
                    onClick={togglePlay}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-md transition-all hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900"
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    {isPlaying ? (
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <Music className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </motion.div>
                    ) : (
                        <Music className="h-6 w-6 text-zinc-400" />
                    )}
                </button>

                <AnimatePresence>
                    {isPlaying && (
                        <motion.button
                            initial={{ opacity: 0, y: 10, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.5 }}
                            onClick={toggleMute}
                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition-transform hover:scale-110"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                <VolumeX className="h-3 w-3" />
                            ) : (
                                <Volume2 className="h-3 w-3" />
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Animated Sound Waves when playing */}
                {isPlaying && !isMuted && (
                    <div className="absolute -top-1 -left-1 flex h-4 w-4 space-x-0.5">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [4, 12, 4],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                                className="w-1 rounded-full bg-emerald-500"
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default BackgroundMusic;
