import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, X as XIcon, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SURPRISE_DATA } from '../../constants';

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null); // true, false, or null
    const [trickedIndex, setTrickedIndex] = useState(null); // Track triggered trick
    const [showTrickModel, setShowTrickModel] = useState(false); // Track overlay visibility

    const handleAnswer = (index) => {
        const question = SURPRISE_DATA.quiz.questions[currentQuestion];
        const correctIndex = question.correct;

        // Checker for Trick Logic
        if (question.trick && index === question.trick.triggerIndex && trickedIndex !== index) {
            // Instead of standard shake, show custom overlay (GIF/Image)
            setShowTrickModel(true);
            return;
        }

        // Support for single correct answer (number) or multiple correct answers (array)
        // Also allow if it's the tricked button being clicked again (logic: if tricked, it becomes correct)
        const isCorrect = (trickedIndex === index) || (Array.isArray(correctIndex)
            ? correctIndex.includes(index)
            : index === correctIndex);

        if (isCorrect) {
            setLastAnswerCorrect(true);


            setTimeout(() => {
                setLastAnswerCorrect(null);
                setTrickedIndex(null); // Reset trick state for next question
                if (currentQuestion + 1 < SURPRISE_DATA.quiz.questions.length) {
                    setCurrentQuestion(curr => curr + 1);
                } else {
                    finishQuiz();
                }
            }, 1000);
        } else {
            setLastAnswerCorrect(false);
            setTimeout(() => setLastAnswerCorrect(null), 800);
        }
    };

    const finishQuiz = () => {
        setIsFinished(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D946EF', '#F472B6', '#FFF']
        });
    };

    if (isFinished) {
        return (
            <motion.div
                className="w-full max-w-md glass-card p-8 text-center flex flex-col items-center gap-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="bg-romantic-500/20 p-6 rounded-full animate-bounce">
                    <Gift size={64} className="text-romantic-500" />
                </div>
                <h2 className="text-4xl font-cursive text-white drop-shadow-md">
                    {SURPRISE_DATA.quiz.reward.title}
                </h2>
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <img src={SURPRISE_DATA.quiz.reward.image} alt="Reward" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <p className="text-xl font-bold text-white px-4">
                            {SURPRISE_DATA.quiz.reward.description}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => { setIsFinished(false); setCurrentQuestion(0); }}
                    className="mt-4 px-6 py-2 rounded-full border border-white/30 text-white/50 hover:bg-white/10 hover:text-white transition-all text-sm"
                >
                    Jogar Novamente
                </button>
            </motion.div>
        );
    }

    const question = SURPRISE_DATA.quiz.questions[currentQuestion];

    return (
        <div className="w-full max-w-2xl px-4 relative">
            {/* Image/GIF Trick Overlay */}
            <AnimatePresence>
                {showTrickModel && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => {
                            setShowTrickModel(false);
                            setTrickedIndex(question.trick.triggerIndex);
                        }}
                    >
                        <div className="relative max-w-lg w-full bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_0_50px_rgba(217,70,239,0.3)] text-center">
                            <h3 className="text-3xl font-cursive text-romantic-300 mb-6 drop-shadow-md">Nananinanão! ☝️</h3>

                            {/* Placeholder Image/GIF */}
                            <img
                                src="/assets/trick.gif"
                                onError={(e) => e.target.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R5cHRyZGh0aWZ5ZGh0aWZ5ZGh0aWZ5ZGh0aWZ5ZGh0aWZ5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gnE4FFxbWe4lq/giphy.gif"} // Fallback GIF
                                alt="Trick"
                                className="w-full h-64 object-contain rounded-xl mb-6 mix-blend-screen"
                            />

                            <p className="text-white/60 text-sm animate-pulse">
                                (Toque em qualquer lugar para fechar)
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Red Flash Overlay (only for normal wrong answers) */}
            <AnimatePresence>
                {lastAnswerCorrect === false && !showTrickModel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-red-600 z-50 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <h2 className="text-4xl md:text-5xl font-cursive text-center text-romantic-300 mb-8 drop-shadow-md">
                {SURPRISE_DATA.quiz.title} ({currentQuestion + 1}/{SURPRISE_DATA.quiz.questions.length})
            </h2>

            <motion.div
                key={currentQuestion}
                className={`
                    glass-card p-8 flex flex-col gap-8
                    ${lastAnswerCorrect === false ? 'animate-shake border-red-500/50' : ''}
                    ${lastAnswerCorrect === true ? 'border-green-500/50' : ''}
                `}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
            >
                <h3 className="text-2xl font-serif text-white text-center">
                    {question.text}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className={`
                                p-4 rounded-xl border transition-all font-sans text-lg active:scale-95
                                ${lastAnswerCorrect === false ? 'hover:bg-red-500/10 hover:border-red-500' : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-romantic-500'}
                                ${(trickedIndex === index) ? 'bg-romantic-500 text-white border-romantic-400 scale-105 font-bold shadow-lg' : 'text-white/90'}
                            `}
                        >
                            {(trickedIndex === index && question.trick?.changeTo) ? question.trick.changeTo : option}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
