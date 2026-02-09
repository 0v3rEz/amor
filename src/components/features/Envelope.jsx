import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { SURPRISE_DATA } from '../../constants';

export default function Envelope() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

    if (!SURPRISE_DATA.surprise.envelope) return null;

    const { from, to, version, pages } = SURPRISE_DATA.surprise.envelope;

    useEffect(() => {
        // Check local storage for the last read version
        const lastReadVersion = parseInt(localStorage.getItem('envelope_version') || '0', 10);
        if (version > lastReadVersion) {
            setHasUnreadMessages(true);
        }
    }, [version]);

    const handleOpen = () => {
        setIsOpen(true);
        // Mark as read immediately upon opening
        if (hasUnreadMessages) {
            setHasUnreadMessages(false);
            localStorage.setItem('envelope_version', version.toString());
        }
    };

    const handleNextPage = (e) => {
        e.stopPropagation();
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = (e) => {
        e.stopPropagation();
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <>
            <AnimatePresence>
                {/* Draggable Closed Envelope */}
                {!isOpen && (
                    <motion.div
                        drag
                        dragMomentum={false}
                        initial={{ opacity: 0, scale: 0, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="fixed bottom-24 right-8 z-40 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-romantic-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
                            <div className="relative bg-white text-romantic-500 p-4 rounded-lg shadow-2xl border-2 border-romantic-200 flex items-center gap-3">
                                <Mail size={32} />
                                <span className="font-cursive text-lg font-bold">Para Você</span>
                            </div>

                            {/* Notification Dot - Only shows if there's a new version */}
                            {hasUnreadMessages && (
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-bounce shadow-md border border-white" />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Opened Letter Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotateX: 90 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="bg-[#fff9f0] text-gray-800 w-full max-w-lg p-8 rounded-sm shadow-2xl relative rotate-1 flex flex-col min-h-[400px]"
                            style={{
                                backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Paper Texture Effect */}
                            <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none mix-blend-multiply" />

                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
                            >
                                <X size={24} />
                            </button>

                            <div className="font-serif relative z-10 flex-1 flex flex-col">
                                <div className="border-b border-gray-300 pb-4 mb-4 flex justify-between items-end">
                                    <span className="text-sm text-gray-500 italic">{from}</span>
                                    <span className="text-xs text-romantic-400 font-bold tracking-widest uppercase">
                                        Página {currentPage + 1} de {pages.length}
                                    </span>
                                </div>

                                {currentPage === 0 && (
                                    <h3 className="text-xl font-bold text-romantic-600 mb-6">{to}</h3>
                                )}

                                <div className="flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar">
                                    <motion.p
                                        key={currentPage}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="whitespace-pre-line text-lg leading-relaxed text-gray-700"
                                    >
                                        {pages[currentPage]}
                                    </motion.p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-300 flex justify-between items-center relative">
                                    {/* Prev Button */}
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 0}
                                        className={`transition-colors flex items-center gap-1 text-sm font-bold
                                            ${currentPage === 0 ? 'text-gray-300 cursor-default' : 'text-romantic-500 hover:text-romantic-700'}
                                        `}
                                    >
                                        <ChevronLeft size={20} /> Anterior
                                    </button>

                                    {/* Next Button */}
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === pages.length - 1}
                                        className={`transition-colors flex items-center gap-1 text-sm font-bold
                                            ${currentPage === pages.length - 1 ? 'text-gray-300 cursor-default' : 'text-romantic-500 hover:text-romantic-700'}
                                        `}
                                    >
                                        Próximo <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
