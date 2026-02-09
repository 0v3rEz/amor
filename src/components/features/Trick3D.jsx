import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, Html, OrbitControls } from '@react-three/drei';

function Model({ url }) {
    const group = useRef();
    const { scene, animations } = useGLTF(url);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Play the first animation found, if any
        if (actions && Object.keys(actions).length > 0) {
            const firstAction = Object.values(actions)[0];
            firstAction.reset().fadeIn(0.5).play();
        }
    }, [actions]);

    useFrame((state) => {
        if (!animations || animations.length === 0) {
            // Fallback animation: Shake head "No"
            const time = state.clock.getElapsedTime();
            group.current.rotation.y = Math.sin(time * 15) * 0.5;
        }
    });

    return <primitive ref={group} object={scene} scale={2} position={[0, -1, 0]} />;
}

function Loader() {
    return <Html center><div className="text-white text-xl animate-pulse">Carregando Modelo 3D...</div></Html>;
}

export default function Trick3D({ modelPath = "/assets/trick_emoji.glb", onClose }) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full h-full max-w-2xl max-h-[80vh] relative cursor-grab active:cursor-grabbing" onClick={(e) => e.stopPropagation()}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Suspense fallback={<Loader />}>
                        <Model url={modelPath} />
                    </Suspense>

                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} />
                </Canvas>

                <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                    <p className="text-white/80 text-lg font-bold bg-black/50 inline-block px-4 py-2 rounded-full">
                        Clique fora para sair
                    </p>
                </div>
            </div>
        </div>
    );
}

// Preload (optional, safe to fail if file missing)
try {
    useGLTF.preload('/assets/trick_emoji.glb');
} catch (e) {
    console.warn("Preload failed", e);
}
