import { motion } from 'framer-motion';
import Surprise from '../components/features/Surprise';

export default function SurprisePage({ contentVariants }) {
    return (
        <motion.div
            className="w-full flex justify-center"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="surprise"
        >
            <Surprise />
        </motion.div>
    );
}
