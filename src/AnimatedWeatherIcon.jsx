import { motion } from 'framer-motion';
import {
    Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudSun, Moon, CloudMoon
} from 'lucide-react';

const AnimatedWeatherIcon = ({ code, isDay = true, size = 64, className = "" }) => {

    // Animation Variants
    const spin = {
        animate: { rotate: 360 },
        transition: { repeat: Infinity, duration: 12, ease: "linear" }
    };

    const float = {
        animate: { y: [0, -5, 0] },
        transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
    };

    const bounce = {
        animate: { y: [0, -3, 0] },
        transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
    };

    const pulse = {
        animate: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
        transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    };

    const shake = {
        animate: { x: [-1, 1, -1] },
        transition: { repeat: Infinity, duration: 0.2, ease: "linear" }
    };

    // Helper to determine icon and applied animation
    const getIcon = () => {
        // Clear
        if (code === 0) {
            return isDay ?
                <motion.div {...spin}><Sun size={size} color="#fcd34d" /></motion.div> :
                <motion.div {...float}><Moon size={size} color="#d1fae5" /></motion.div>;
        }

        // Mainly Clear / Partly Cloudy
        if (code === 1 || code === 2) {
            return isDay ?
                <motion.div {...float}><CloudSun size={size} color="#fff" /></motion.div> :
                <motion.div {...float}><CloudMoon size={size} color="#94a3b8" /></motion.div>;
        }

        // Overcast
        if (code === 3) {
            return <motion.div {...float}><Cloud size={size} color="#94a3b8" /></motion.div>;
        }

        // Fog
        if ([45, 48].includes(code)) {
            return <motion.div {...float}><CloudFog size={size} color="#cbd5e1" /></motion.div>;
        }

        // Rain / Drizzle / Showers
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
            return <motion.div {...bounce}><CloudRain size={size} color="#60a5fa" /></motion.div>;
        }

        // Snow
        if ([71, 73, 75, 77, 85, 86].includes(code)) {
            return <motion.div {...float}><CloudSnow size={size} color="#e2e8f0" /></motion.div>;
        }

        // Thunderstorm
        if ([95, 96, 99].includes(code)) {
            return <motion.div {...shake}><CloudLightning size={size} color="#fbbf24" /></motion.div>;
        }

        // Default
        return <Sun size={size} />;
    };

    return (
        <div className={`icon-container ${className}`} style={{ display: 'inline-block' }}>
            {getIcon()}
        </div>
    );
};

export default AnimatedWeatherIcon;
