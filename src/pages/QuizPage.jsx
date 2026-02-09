import { motion } from 'framer-motion';
import Quiz from '../components/features/Quiz';

export default function QuizPage({ contentVariants }) {
    return (
        <motion.div
            className="w-full flex justify-center"
            variants={contentVariants}
            initial="hidden" animate="visible" exit="exit"
            key="quiz"
        >
            <Quiz />
        </motion.div>
    );
}
