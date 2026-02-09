import { motion } from 'framer-motion';
import { Stars } from 'lucide-react';
import Timer from '../components/features/Timer';
import Carousel from '../components/features/Carousel';
import { SURPRISE_DATA } from '../constants';

export default function Home({ contentVariants }) {
    return (
        <motion.div
            className="w-full max-w-4xl p-6 md:p-12 flex flex-col md:flex-row gap-12 items-center justify-center"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="home"
        >
            {/* Left Column: Text & Timer */}
            <div className="flex-1 flex flex-col gap-8 text-center md:text-left z-20">
                <div>
                    <h1 className="font-cursive text-6xl md:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-romantic-300 to-romantic-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                        Nossa História
                    </h1>
                    <p className="font-sans text-white/60 tracking-[0.2em] text-sm uppercase flex items-center justify-center md:justify-start gap-2">
                        <Stars size={14} className="text-neon-blue" />
                        "O começo de um pra sempre"
                    </p>
                </div>

                <div className="glass-card p-6 border-l-4 border-l-romantic-500">
                    <Timer startDate={SURPRISE_DATA.startDate} />
                </div>

                <p className="text-lg text-white/80 italic font-light leading-relaxed max-w-md">
                    "{SURPRISE_DATA.message}"
                </p>
            </div>

            {/* Right Column: Carousel & Music */}
            <div className="flex-1 w-full max-w-sm flex flex-col gap-6">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-romantic-500 to-neon-blue rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative bg-black rounded-2xl overflow-hidden glass-card">
                        <Carousel images={SURPRISE_DATA.images} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
