import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SURPRISE_DATA } from '../constants';

const AudioContext = createContext();

export function useAudio() {
    return useContext(AudioContext);
}

export function AudioProvider({ children }) {
    const [audioElement, setAudioElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMusicOpen, setIsMusicOpen] = useState(true);

    // Toggle play/pause
    const togglePlay = () => {
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play().catch(e => console.error("Play error:", e));
                setIsPlaying(true);
            } else {
                audioElement.pause();
                setIsPlaying(false);
            }
        }
    };

    // Update isPlaying state when audio events occur (e.g. external pause, end)
    useEffect(() => {
        if (!audioElement) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audioElement.addEventListener('play', onPlay);
        audioElement.addEventListener('pause', onPause);

        return () => {
            audioElement.removeEventListener('play', onPlay);
            audioElement.removeEventListener('pause', onPause);
        };
    }, [audioElement]);

    const value = {
        audioElement,
        setAudioElement,
        isPlaying,
        togglePlay,
        isMusicOpen,
        setIsMusicOpen,
        musicSettings: SURPRISE_DATA.musicSettings
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
}
