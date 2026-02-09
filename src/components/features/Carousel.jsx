import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden group">

            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="Moment"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                />
            </AnimatePresence>

            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Navigation Buttons (Hidden by default, show on hover) */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={prevSlide} className="p-2 bg-black/50 hover:bg-romantic-500 rounded-full text-white backdrop-blur-md transition-all">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="p-2 bg-black/50 hover:bg-romantic-500 rounded-full text-white backdrop-blur-md transition-all">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`
                            h-1 rounded-full transition-all duration-300 
                            ${i === currentIndex ? 'w-6 bg-romantic-500' : 'w-2 bg-white/30'}
                        `}
                    />
                ))}
            </div>
        </div>
    );
}
