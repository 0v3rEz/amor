import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { SURPRISE_DATA } from '../constants';

export default function Reasons({ contentVariants }) {
    return (
        <motion.div
            className="w-full max-w-3xl"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="reasons"
        >
            <h2 className="text-4xl md:text-5xl font-cursive text-center text-romantic-300 mb-10 drop-shadow-md">
                Por que te amo?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                {SURPRISE_DATA.reasons.map((reason, i) => (
                    <motion.div
                        key={i}
                        className="glass p-4 rounded-xl flex items-start gap-4 hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="mt-1 bg-romantic-500/20 p-1 rounded-full">
                            <Heart size={16} className="text-romantic-500 fill-romantic-500" />
                        </div>
                        <p className="text-white/90">{reason}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
