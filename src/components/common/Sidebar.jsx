import { motion } from 'framer-motion';
import { Heart, Users, Star, Sparkles, Mail, Gift, Map, Crown } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 'home', label: 'História', icon: Heart },
        { id: 'timeline', label: 'Jornada', icon: Map },
        { id: 'about', label: 'Sobre Nós', icon: Users },
        { id: 'reasons', label: 'Motivos', icon: Star },
        { id: 'future', label: 'Futuro', icon: Sparkles },
        { id: 'capsules', label: 'Cartas', icon: Mail },
        { id: 'quiz', label: 'Desafio', icon: Gift },
        { id: 'surprise', label: 'Surpresa', icon: Crown }, // New Tab
    ];

    return (
        <div className="fixed left-0 md:left-4 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-full md:w-auto z-50 p-2 md:p-4 flex justify-center">
            <div className="glass-card px-3 py-2 md:py-6 md:px-3 flex md:flex-col gap-2 md:gap-8 items-center justify-between rounded-full md:rounded-full border-t border-white/10 md:border-t-white/5 w-full md:w-auto max-w-md md:max-w-none mx-auto">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative group flex items-center justify-center p-2"
                        >
                            {/* Active Indicator (Cleaner & Sharper) */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-romantic-500/10 border border-romantic-500/50 rounded-xl shadow-[0_0_10px_rgba(217,70,239,0.3)]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}

                            {/* Icon */}
                            <div className={`relative z-10 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                                <Icon
                                    size={24}
                                    className={`transition-colors duration-300 ${isActive
                                        ? 'text-romantic-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                                        : 'text-white/40 group-hover:text-white/80'
                                        }`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>

                            {/* Tooltip (Desktop only) */}
                            <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-xs text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10">
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
