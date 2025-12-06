import { useRef, useEffect, useContext } from 'react';
import { WeatherContext } from './WeatherContext';

const Particles = () => {
    const { weatherData } = useContext(WeatherContext);
    const canvasRef = useRef(null);

    // Safe access to weather code
    const weatherCode = weatherData?.weather?.[0]?.icon || '';

    // Determine Type
    const isRain = ['09d', '10d', '11d', '13d', '50d'].some(code => weatherCode.includes(code.slice(0, 2))); // Basic check
    // Refined check based on WMO codes would be better but icon check is decent proxy for now if mapped correctly
    // Let's use the explicit raw WMO code if possible, but context processes it.
    // Actually, WeatherContext 'weather' prop is the processed array. 
    // Let's assume 'Rainy' or 'Snowy' classes in App.css correlate.

    // Let's try to detect based on description or re-import the util?
    // Simpler: Pass raw code? 
    // For now, let's use a simple mapping from the icon string which we have.
    // OpenWeather/Meteo icons: 
    // 09d, 10d = Rain
    // 11d = Thunder
    // 13d = Snow
    // 50d = Mist

    const width = window.innerWidth;
    const height = window.innerHeight;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        let particles = [];
        let animationFrameId;

        // Config based on weather
        let config = {
            count: 0,
            speed: 0,
            type: 'none' // 'rain', 'snow'
        };

        if (weatherCode === '09d' || weatherCode === '10d' || weatherCode === '11d') {
            config = { count: 100, speed: 15, type: 'rain' };
        } else if (weatherCode === '13d') {
            config = { count: 50, speed: 2, type: 'snow' };
        } else {
            config = { count: 0, speed: 0, type: 'none' };
        }

        // Init Particles
        for (let i = 0; i < config.count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                l: Math.random() * 20 + 10, // length (rain) or radius (snow)
                vx: Math.random() * 4 - 2, // wind
                vy: Math.random() * config.speed + config.speed / 2
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1;

            particles.forEach(p => {
                if (config.type === 'rain') {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + p.vx, p.y + p.l);
                    ctx.stroke();
                } else if (config.type === 'snow') {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.random() * 2 + 1, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Update
                p.x += p.vx;
                p.y += p.vy;

                // Reset
                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x > canvas.width) p.x = 0;
                if (p.x < 0) p.x = canvas.width;
            });

            if (config.type !== 'none') {
                animationFrameId = requestAnimationFrame(draw);
            }
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [weatherCode]); // Re-run when weather changes

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0 // Behind everything but above background
            }}
        />
    );
};

export default Particles;
