import { motion } from 'framer-motion';
import PolaroidGallery from '../components/features/PolaroidGallery';
import { SURPRISE_DATA } from '../constants';

export default function About({ contentVariants }) {
    return (
        <motion.div
            className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="about"
        >
            <div className="flex-1 w-full space-y-6 text-center md:text-left order-2 md:order-1">
                <h2 className="text-4xl md:text-5xl font-cursive text-romantic-300 mb-6 drop-shadow-md">
                    {SURPRISE_DATA.aboutUs.title}
                </h2>
                <div className="space-y-6 text-white/90 text-lg leading-relaxed font-light glass-card p-8">
                    <p>{SURPRISE_DATA.aboutUs.description}</p>
                    <p className="pl-4 border-l-2 border-neon-blue/50 italic text-white/70">
                        "{SURPRISE_DATA.aboutUs.content}"
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full order-1 md:order-2 h-[400px]">
                <PolaroidGallery />
            </div>
        </motion.div>
    );
}
