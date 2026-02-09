import { useEffect, useRef } from 'react';
import { SURPRISE_DATA } from '../../constants';

export default function SoundWave({ audioElement }) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!audioElement) return;

        const initAudio = () => {
            // Initialize Audio Context only once user interacts (handled by parent start)
            if (!contextRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                contextRef.current = new AudioContext();

                analyserRef.current = contextRef.current.createAnalyser();
                analyserRef.current.fftSize = 256;

                // Connect audio element to analyser
                try {
                    if (!sourceRef.current) {
                        sourceRef.current = contextRef.current.createMediaElementSource(audioElement);
                        sourceRef.current.connect(analyserRef.current);
                        analyserRef.current.connect(contextRef.current.destination);
                    }
                } catch (e) {
                    console.error("Error connecting audio source:", e);
                }
            } else if (contextRef.current.state === 'suspended') {
                contextRef.current.resume();
            }
        };

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const bufferLength = 128;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (analyserRef.current) {
                analyserRef.current.getByteFrequencyData(dataArray);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate average frequency for "beat" effect
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const average = sum / bufferLength;

            // Draw smoothed waves based on frequency
            const drawWave = (color, multiplier, offset) => {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);

                for (let i = 0; i < canvas.width; i += 10) {
                    const index = Math.floor((i / canvas.width) * bufferLength);
                    const value = dataArray[index] || 0;

                    // Combine sine wave movement with frequency data
                    // If no audio (average < 5), fallback to gentle sine wave
                    const waveHeight = (value > 0 ? value * multiplier : 10) + (average * 0.5);
                    const y = canvas.height - 50 - (Math.sin(i * 0.01 + offset + Date.now() * 0.002) * 20) - (waveHeight * 0.5);

                    ctx.lineTo(i, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.fillStyle = color;
                ctx.fill();
            };

            drawWave('rgba(217, 70, 239, 0.2)', 0.6, 0); // Pink
            drawWave('rgba(168, 85, 247, 0.2)', 0.4, 2); // Purple
            drawWave('rgba(236, 72, 153, 0.2)', 0.2, 4); // Rose

            animationRef.current = requestAnimationFrame(draw);
        };

        // Attach events to initialize audio context on play
        audioElement.addEventListener('play', initAudio);

        // If already playing (e.g. strict mode re-mount), init immediately
        if (!audioElement.paused) {
            initAudio();
        }

        // Start animation loop
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            audioElement.removeEventListener('play', initAudio);

            // Cleanup source reference
            sourceRef.current = null;
        };
    }, [audioElement]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed bottom-0 left-0 w-full h-64 pointer-events-none z-0 mix-blend-screen opacity-80"
        />
    );
}
