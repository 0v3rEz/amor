import { motion } from 'framer-motion';
import Capsules from '../components/features/Capsules';

export default function CapsulesPage({ contentVariants }) {
    return (
        <motion.div
            className="w-full flex justify-center"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="capsules"
        >
            <Capsules />
        </motion.div>
    );
}
