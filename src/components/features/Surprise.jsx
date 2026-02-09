import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Gift, Crown } from 'lucide-react';
import { SURPRISE_DATA } from '../../constants';
import Envelope from './Envelope';

export default function Surprise() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(SURPRISE_DATA.surprise.targetDate) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
                setIsUnlocked(false);
            } else {
                setIsUnlocked(true);
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Run immediately

        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 glass-card flex items-center justify-center text-2xl md:text-3xl font-bold text-white mb-2 shadow-[0_0_15px_rgba(217,70,239,0.3)] border border-white/10">
                {String(value).padStart(2, '0')}
            </div>
            <span className="text-xs uppercase tracking-widest text-white/60 font-medium">{label}</span>
        </div>
    );

    return (
        <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center p-6 relative">
            <Envelope />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-card p-8 md:p-12 w-full flex flex-col items-center gap-8 border border-white/10"
            >
                <div>
                    <div className="mb-4 inline-block p-4 rounded-full bg-romantic-500/10 border border-romantic-500/30 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                        {isUnlocked ? <Gift size={48} className="text-neon-blue" /> : <Lock size={48} className="text-romantic-300" />}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-romantic-300 to-romantic-500 drop-shadow-md mb-4">
                        {SURPRISE_DATA.surprise.title}
                    </h2>
                    <p className="text-lg text-white/70 max-w-lg mx-auto">
                        {isUnlocked ? SURPRISE_DATA.surprise.unlockedMessage : SURPRISE_DATA.surprise.lockedMessage}
                    </p>
                </div>

                {!isUnlocked && (
                    <div className="flex gap-4 md:gap-8 justify-center flex-wrap">
                        <TimeUnit value={timeLeft.days} label="Dias" />
                        <TimeUnit value={timeLeft.hours} label="Horas" />
                        <TimeUnit value={timeLeft.minutes} label="Min" />
                        <TimeUnit value={timeLeft.seconds} label="Seg" />
                    </div>
                )}

                <button
                    disabled={!isUnlocked}
                    className={`
                        relative px-8 py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-300 flex items-center gap-3
                        ${isUnlocked
                            ? 'bg-gradient-to-r from-neon-blue to-purple-600 text-white hover:scale-105 shadow-[0_0_20px_rgba(0,255,242,0.5)] cursor-pointer'
                            : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed hover:bg-white/10'}
                    `}
                    onClick={() => isUnlocked && alert('✨ Configure o conteúdo da surpresa aqui! ✨')}
                >
                    {isUnlocked ? (
                        <>
                            <Unlock size={20} />
                            {SURPRISE_DATA.surprise.buttonTextUnlocked}
                        </>
                    ) : (
                        <>
                            <Lock size={20} />
                            {SURPRISE_DATA.surprise.buttonTextLocked}
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
}
