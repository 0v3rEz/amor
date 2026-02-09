import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MouseTrail() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add new trail particle
            const newTrail = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };

            setTrails(prev => [...prev.slice(-15), newTrail]); // Keep last 15
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50">
            <AnimatePresence>
                {trails.map((trail, index) => (
                    <motion.div
                        key={trail.id}
                        className="absolute w-3 h-3 bg-neon-pink rounded-full blur-sm"
                        initial={{
                            x: trail.x,
                            y: trail.y,
                            scale: 0.8,
                            opacity: 0.8
                        }}
                        animate={{
                            scale: 0,
                            opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            boxShadow: "0 0 10px #D946EF"
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
