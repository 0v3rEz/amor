import { useState, useEffect } from 'react';
import { intervalToDuration } from 'date-fns';
import { motion } from 'framer-motion';

export default function Timer({ startDate }) {
    const [duration, setDuration] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const start = new Date(startDate);
        const updateTimer = () => {
            const now = new Date();
            setDuration(intervalToDuration({ start, end: now }));
        };
        updateTimer();
        const timer = setInterval(updateTimer, 1000); // Update every second
        return () => clearInterval(timer);
    }, [startDate]);

    const TimeItem = ({ value, label }) => (
        <div className="flex flex-col items-center mx-1 md:mx-2">
            <div className="relative">
                <span className="text-2xl md:text-5xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {String(value || 0).padStart(2, '0')}
                </span>
                {/* Neon Underline */}
                <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-romantic-500 shadow-[0_0_10px_#D946EF]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
            <span className="text-[8px] md:text-xs uppercase tracking-widest text-romantic-300/80 mt-2 font-bold">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4 py-4">
            {duration.years > 0 && (
                <>
                    <TimeItem value={duration.years} label="Anos" />
                    <span className="text-xl md:text-2xl text-white/20">:</span>
                </>
            )}
            {duration.months > 0 && (
                <>
                    <TimeItem value={duration.months} label="Meses" />
                    <span className="text-xl md:text-2xl text-white/20">:</span>
                </>
            )}
            <TimeItem value={duration.days} label="Dias" />
            <span className="text-xl md:text-2xl text-white/20">:</span>
            <TimeItem value={duration.hours} label="Hrs" />
            <span className="text-xl md:text-2xl text-white/20">:</span>
            <TimeItem value={duration.minutes} label="Min" />
            <span className="text-xl md:text-2xl text-white/20">:</span>
            <TimeItem value={duration.seconds} label="Seg" />
        </div>
    );
}
