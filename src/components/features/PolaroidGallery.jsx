import { motion } from 'framer-motion';
import { SURPRISE_DATA } from '../../constants';

export default function PolaroidGallery() {
    return (
        <div className="w-full h-full min-h-[500px] relative flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />

            {SURPRISE_DATA.polaroids.map((photo, index) => (
                <motion.div
                    key={index}
                    className="absolute w-64 md:w-72 bg-white p-4 pb-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing"
                    style={{
                        rotate: photo.rotate,
                        zIndex: index
                    }}
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                    whileDrag={{ scale: 1.2, zIndex: 100, rotate: 0 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                >
                    <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-4">
                        <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-full object-cover pointer-events-none select-none"
                        />
                    </div>
                    <p className="font-cursive text-3xl text-gray-800 text-center -rotate-2 opacity-90">
                        {photo.caption}
                    </p>
                </motion.div>
            ))}

            <p className="absolute bottom-10 text-white/50 text-sm animate-pulse">
                (Arraste as fotos)
            </p>
        </div>
    );
}
