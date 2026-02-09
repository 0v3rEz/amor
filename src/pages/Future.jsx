import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SURPRISE_DATA } from '../constants';

export default function Future({ contentVariants }) {
    return (
        <motion.div
            className="w-full max-w-4xl flex flex-col items-center text-center"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="future"
        >
            <h2 className="text-5xl md:text-6xl font-cursive text-neon-blue mb-4 drop-shadow-[0_0_10px_rgba(0,255,242,0.3)]">
                {SURPRISE_DATA.future.title}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mb-12">
                {SURPRISE_DATA.future.description}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
                {SURPRISE_DATA.future.goals.map((goal, i) => (
                    <motion.div
                        key={i}
                        className="relative group w-40 h-40 glass-card flex flex-col items-center justify-center p-4 gap-3 cursor-default"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-romantic-500/20 to-neon-blue/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CheckCircle2 size={32} className="text-white/50 group-hover:text-neon-blue transition-colors" />
                        <span className="text-sm font-medium text-white/90">{goal}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
