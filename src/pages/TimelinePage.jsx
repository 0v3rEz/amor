import { motion } from 'framer-motion';
import Timeline from '../components/features/Timeline';

export default function TimelinePage({ contentVariants }) {
    return (
        <motion.div
            className="w-full flex justify-center"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="timeline"
        >
            <Timeline />
        </motion.div>
    );
}
