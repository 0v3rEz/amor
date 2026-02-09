import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

// Context
import { AudioProvider, useAudio } from './context/AudioContext';

// Common Components
import Overlay from './components/common/Overlay';
import Sidebar from './components/common/Sidebar';
import MouseTrail from './components/common/MouseTrail';
import ErrorBoundary from './components/common/ErrorBoundary';

// Feature Components
import SoundWave from './components/features/SoundWave';
import MusicPlayer from './components/features/MusicPlayer';

// Pages
import Home from './pages/Home';
import TimelinePage from './pages/TimelinePage';
import About from './pages/About';
import Reasons from './pages/Reasons';
import Future from './pages/Future';
import CapsulesPage from './pages/CapsulesPage';
import QuizPage from './pages/QuizPage';
import SurprisePage from './pages/SurprisePage';

function AppContent() {
    const [started, setStarted] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const { audioElement, setAudioElement, musicSettings } = useAudio();

    // Content Variants for simplified transitions
    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <Home contentVariants={contentVariants} />;
            case 'timeline': return <TimelinePage contentVariants={contentVariants} />;
            case 'about': return <About contentVariants={contentVariants} />;
            case 'reasons': return <Reasons contentVariants={contentVariants} />;
            case 'future': return <Future contentVariants={contentVariants} />;
            case 'capsules': return <CapsulesPage contentVariants={contentVariants} />;
            case 'quiz': return <QuizPage contentVariants={contentVariants} />;
            case 'surprise': return <SurprisePage contentVariants={contentVariants} />;
            default: return null;
        }
    };

    return (
        <>
            <MouseTrail />
            <SoundWave audioElement={audioElement} />

            {/* Persistent Audio Element managed via Context/State */}
            {started && musicSettings?.type === 'local' && (
                <audio
                    ref={setAudioElement}
                    id="local-audio"
                    crossOrigin="anonymous"
                    autoPlay
                    loop
                    onLoadedMetadata={(e) => {
                        const audio = e.currentTarget;
                        if (musicSettings.startOffset) {
                            audio.currentTime = musicSettings.startOffset;
                        }
                        audio.play().catch(error => console.log("Autoplay blocked:", error));
                    }}
                >
                    <source src={musicSettings.url} type="audio/mpeg" />
                </audio>
            )}

            <AnimatePresence>
                {!started && <Overlay onStart={() => setStarted(true)} />}
            </AnimatePresence>

            <motion.div
                className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: started ? 1 : 0 }}
                transition={{ duration: 1.5 }}
            >
                {/* 3D Heart Field Background */}
                <div className="fixed inset-0 pointer-events-none z-0 perspective-[1000px]">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`far-${i}`}
                            className="absolute text-romantic-900/40 blur-[2px]"
                            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, z: -200, rotate: Math.random() * 360 }}
                            animate={{ y: [null, Math.random() * -100], rotateX: [0, 360], rotateY: [0, 360] }}
                            transition={{ duration: Math.random() * 30 + 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
                        </motion.div>
                    ))}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={`mid-${i}`}
                            className="absolute text-romantic-500/20 blur-[1px]"
                            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, z: 0, rotate: Math.random() * 360 }}
                            animate={{ y: [null, Math.random() * -150], rotateZ: [0, 180] }}
                            transition={{ duration: Math.random() * 20 + 10, repeat: Infinity, ease: "linear" }}
                        >
                            <Heart size={Math.random() * 40 + 20} fill="currentColor" />
                        </motion.div>
                    ))}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={`close-${i}`}
                            className="absolute text-neon-pink/10 drop-shadow-[0_0_10px_rgba(255,0,128,0.3)]"
                            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight + 100, z: 100, rotate: Math.random() * 360 }}
                            animate={{ y: [null, Math.random() * -300], rotate: [0, -360], scale: [1, 1.2, 1] }}
                            transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "linear" }}
                        >
                            <Heart size={Math.random() * 60 + 40} fill="currentColor" />
                        </motion.div>
                    ))}
                </div>

                {/* Sidebar Navigation */}
                {started && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}

                {/* Music Player */}
                {started && <MusicPlayer />}

                {/* Main Content Area */}
                <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 md:pl-24 pb-24 md:pb-4 transition-all duration-500">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <AudioProvider>
                <AppContent />
            </AudioProvider>
        </ErrorBoundary>
    );
}

export default App;
