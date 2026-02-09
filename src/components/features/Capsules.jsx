import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MailOpen, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SURPRISE_DATA } from '../../constants';

export default function Capsules() {
    const [selectedCapsule, setSelectedCapsule] = useState(null);

    const handleOpenCapsule = (capsule) => {
        setSelectedCapsule(capsule);
        // Trigger impact confetti
        const colors = capsule.id % 2 === 0 ? ['#D946EF', '#FFF'] : ['#00E0FF', '#FFF'];
        confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.8 },
            colors: colors,
            zIndex: 1000 // Above modal
        });
    };

    return (
        <div className="w-full max-w-6xl p-4">
            <motion.h2
                className="text-4xl md:text-5xl font-cursive text-center text-romantic-300 mb-12 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Mensagens do Coração
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {SURPRISE_DATA.capsules.map((capsule, i) => (
                    <motion.button
                        key={capsule.id}
                        onClick={() => handleOpenCapsule(capsule)}
                        className={`
                            relative h-64 rounded-3xl p-1 overflow-hidden group perspective-[1000px]
                        `}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Glowing Border Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${capsule.color} opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

                        {/* Card Content */}
                        <div className="relative h-full w-full bg-black/90 rounded-[22px] flex flex-col items-center justify-center gap-4 border border-white/10 backdrop-blur-xl group-hover:bg-black/80 transition-colors">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative bg-white/10 p-5 rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
                                    <span className="text-5xl drop-shadow-lg">{capsule.emoji}</span>
                                </div>
                            </div>

                            <p className="font-heading font-bold text-white text-xl text-center px-4 leading-tight group-hover:text-romantic-300 transition-colors">
                                {capsule.title}
                            </p>

                            <div className="absolute bottom-4 flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                <Mail size={12} />
                                Abrir Carta
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Cinematic Modal */}
            <AnimatePresence>
                {selectedCapsule && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCapsule(null)}
                    >
                        {/* Background Spotlight */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${selectedCapsule.color} opacity-10 blur-3xl`} />

                        <motion.div
                            className="relative bg-[#0a0a0a] text-white rounded-3xl max-w-lg w-full shadow-[0_0_100px_rgba(217,70,239,0.2)] border border-white/10 max-h-[85vh] overflow-y-auto"
                            initial={{ scale: 0.5, y: 100, rotateX: 20 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.8, y: 100, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Fixed Close Button */}
                            <button
                                onClick={() => setSelectedCapsule(null)}
                                className="sticky top-4 right-4 ml-auto mr-4 mt-4 z-50 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2 px-4 mb-[-3rem]"
                            >
                                <span className="text-xs font-bold uppercase tracking-wider">Fechar</span>
                                <X size={20} />
                            </button>

                            {/* Header Image with Parallax-like feel */}
                            <div className="h-64 overflow-hidden relative">
                                <motion.img
                                    src={selectedCapsule.image}
                                    alt="Moment"
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 5 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                            </div>

                            {/* Content Reveal */}
                            <div className="relative p-10 text-center flex flex-col items-center gap-6 -mt-20">
                                {/* Floating Icon Halo */}
                                <motion.div
                                    className={`relative z-10 bg-gradient-to-br ${selectedCapsule.color} p-1 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)]`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="bg-[#0a0a0a] p-4 rounded-full border-4 border-transparent">
                                        <MailOpen size={36} className="text-white" />
                                    </div>
                                </motion.div>

                                <div className="space-y-4">
                                    <motion.h3
                                        className="font-cursive text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {selectedCapsule.title}
                                    </motion.h3>

                                    <motion.div
                                        className="w-16 h-1 bg-gradient-to-r from-transparent via-romantic-500 to-transparent mx-auto rounded-full"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                    />

                                    <motion.p
                                        className="font-sans text-lg text-gray-300 leading-relaxed italic pb-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        "{selectedCapsule.content}"
                                    </motion.p>
                                </div>

                                {/* Bottom Close Text */}
                                <button
                                    onClick={() => setSelectedCapsule(null)}
                                    className="text-xs uppercase tracking-[0.2em] text-romantic-500 mt-6 hover:text-white transition-colors"
                                >
                                    Toque para fechar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
