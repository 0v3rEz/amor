import { motion } from 'framer-motion';
import { Star, Heart, Gift, Calendar } from 'lucide-react';
import { SURPRISE_DATA } from '../../constants';

const icons = {
    Star, Heart, Gift, Calendar
};

export default function Timeline() {
    return (
        <div className="w-full max-w-4xl p-4 md:p-10">
            <h2 className="text-4xl md:text-5xl font-cursive text-center text-romantic-300 mb-12 drop-shadow-md">
                Nossa Jornada
            </h2>

            <div className="relative border-l-4 border-romantic-500/30 ml-8 md:mx-auto md:w-full space-y-12">
                {/* Central Line for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-romantic-500/50 to-transparent -translate-x-1/2" />

                {SURPRISE_DATA.timeline.map((event, index) => {
                    const Icon = icons[event.icon] || Star;
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            className={`relative flex flex-col md:flex-row items-center w-full md:gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {/* Spacer */}
                            <div className="flex-1 hidden md:block" />

                            {/* Node/Icon (Increased margin to avoid overlap) */}
                            <div className="absolute left-[-1.3rem] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 bg-black border-4 border-romantic-500 rounded-full z-10 shadow-[0_0_15px_#D946EF]">
                                <Icon size={16} className="text-white" />
                            </div>

                            {/* Content Card (Added pl-12 for mobile to clear icon) */}
                            <div className="flex-1 w-full pl-12 md:px-16">
                                <motion.div
                                    className="glass-card p-6 border border-white/10 hover:border-romantic-500/50 transition-colors group"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <span className="inline-block px-3 py-1 rounded-full bg-romantic-500/20 text-romantic-300 text-xs font-bold mb-2 border border-romantic-500/30">
                                        {event.date}
                                    </span>
                                    <h3 className="text-2xl font-cursive text-white mb-2 group-hover:text-romantic-300 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-white/70 font-light leading-relaxed">
                                        {event.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-16 text-center text-white/40 italic">
                ...e a história continua.
            </div>
        </div>
    );
}
