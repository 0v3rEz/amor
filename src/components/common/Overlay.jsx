import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Unlock } from 'lucide-react';

export default function Overlay({ onStart }) {
    const [isPressed, setIsPressed] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const timeoutRef = useRef(null);

    const startPress = () => {
        if (isUnlocking) return;
        setIsPressed(true);
        timeoutRef.current = setTimeout(() => {
            handleUnlock();
        }, 3000); // 3 seconds to unlock
    };

    const endPress = () => {
        if (isUnlocking) return;
        setIsPressed(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleUnlock = () => {
        setIsUnlocking(true);
        setIsPressed(false);
        setTimeout(onStart, 1500); // Wait for exit animation
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            {/* Background Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-romantic-500/20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                        }}
                    >
                        <Heart size={Math.random() * 20 + 10} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="relative flex flex-col items-center gap-8">

                {/* Interaction Button */}
                <div
                    className="relative"
                    onMouseDown={startPress}
                    onMouseUp={endPress}
                    onMouseLeave={endPress}
                    onTouchStart={(e) => { e.preventDefault(); startPress(); }}
                    onTouchEnd={endPress}
                >
                    {/* Progress Ring SVG */}
                    <svg className="absolute -inset-4 w-[128px] h-[128px] rotate-[-90deg] pointer-events-none">
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="#333"
                            strokeWidth="4"
                            fill="transparent"
                        />
                        <motion.circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="#D946EF" // Neon Pink
                            strokeWidth="4"
                            fill="transparent"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: isPressed && !isUnlocking ? 1 : 0 }}
                            transition={{ duration: isPressed && !isUnlocking ? 3 : 0.5, ease: "linear" }}
                        />
                    </svg>

                    {/* Button Core */}
                    <motion.div
                        className={`
                            relative z-10 w-24 h-24 rounded-full flex items-center justify-center cursor-pointer
                            transition-all duration-300
                            ${isUnlocking
                                ? 'bg-romantic-500 shadow-[0_0_50px_#D946EF]'
                                : 'bg-white/5 border border-white/10 shadow-lg hover:bg-white/10'
                            }
                        `}
                        animate={isPressed && !isUnlocking ? { scale: 0.95 } : { scale: 1 }}
                    >
                        {isUnlocking ? (
                            <motion.div
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                            >
                                <Unlock size={40} className="text-white" />
                            </motion.div>
                        ) : (
                            <Lock size={40} className={`opacity-80 transition-colors ${isPressed ? 'text-romantic-500' : 'text-white'}`} />
                        )}
                    </motion.div>
                </div>

                {/* Instructions Text */}
                <div className="text-center h-16">
                    <h2 className="text-3xl font-cursive text-white mb-2 tracking-widest drop-shadow-md">
                        Nossa História
                    </h2>
                    <motion.p
                        className="text-white/50 text-xs uppercase tracking-[0.3em]"
                        animate={{ opacity: isPressed ? 1 : 0.5 }}
                    >
                        {isUnlocking
                            ? 'BEM-VINDO(A)...'
                            : isPressed
                                ? 'SEGURE PARA ABRIR...'
                                : 'SEGURE O CADEADO'}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}
