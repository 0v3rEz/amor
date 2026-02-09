import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export default function MusicPlayer() {
    const {
        audioElement,
        setAudioElement,
        isMusicOpen,
        setIsMusicOpen,
        isPlaying,
        togglePlay,
        musicSettings
    } = useAudio();

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className={`fixed top-4 right-4 md:top-auto md:bottom-4 md:right-4 z-50 transition-all duration-300 ${isMusicOpen ? 'scale-75 origin-top-right md:scale-100' : 'scale-100'}`}
        >
            <div className="glass-card p-2 rounded-full flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10">
                <button
                    onClick={() => setIsMusicOpen(!isMusicOpen)}
                    className={`p-3 rounded-full text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] ${isMusicOpen ? 'bg-white/10 hover:bg-white/20' : 'bg-romantic-500 hover:bg-romantic-600 animate-pulse'}`}
                >
                    <Music size={20} className={isMusicOpen ? "text-neon-pink" : "text-white"} />
                </button>

                <AnimatePresence>
                    {isMusicOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0, margin: 0 }}
                            animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                            exit={{ width: 0, opacity: 0, margin: 0 }}
                            className="overflow-hidden"
                        >
                            {musicSettings?.type === 'local' ? (
                                <div className="flex items-center gap-3 bg-[#181818] p-2 pr-4 rounded-xl min-w-[280px] shadow-lg border border-white/5">
                                    {/* Album Art */}
                                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden shrink-0 relative group">
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <Music className="text-zinc-500" size={20} />
                                    </div>

                                    {/* Song Info */}
                                    <div className="flex flex-col flex-1 overflow-hidden">
                                        <span className="text-sm font-bold text-white truncate leading-tight">Aliança</span>
                                        <span className="text-[10px] text-zinc-400 truncate tracking-wide">Tribalistas</span>
                                    </div>

                                    {/* Custom Play/Pause Button */}
                                    <button
                                        onClick={togglePlay}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1ed760] text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(30,215,96,0.3)]"
                                    >
                                        {isPlaying ? (
                                            <div className="flex gap-1">
                                                <div className="w-1 h-3 bg-black rounded-full"></div>
                                                <div className="w-1 h-3 bg-black rounded-full"></div>
                                            </div>
                                        ) : (
                                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-0.5"></div>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <iframe
                                    src={musicSettings?.spotifyUrl}
                                    width="280"
                                    height="80"
                                    frameBorder="0"
                                    allowFullScreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="rounded-xl opacity-90 hover:opacity-100"
                                ></iframe>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
