import { useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { UnitContext } from './UnitContext';
import {
    Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudSun, Moon, CloudMoon
} from 'lucide-react';
import './HourlyForecast.css';

function HourlyForecast({ hourlyData }) {
    const { units } = useContext(UnitContext);
    const scrollRef = useRef(null);

    if (!hourlyData || !hourlyData.time) return null;

    const currentHourIndex = new Date().getHours();
    // Show 24 hours
    const next24Hours = hourlyData.time.slice(currentHourIndex, currentHourIndex + 24);
    const temps = hourlyData.temperature_2m.slice(currentHourIndex, currentHourIndex + 24);
    const codes = hourlyData.weather_code.slice(currentHourIndex, currentHourIndex + 24);
    const isDays = hourlyData.is_day.slice(currentHourIndex, currentHourIndex + 24);

    const getIcon = (code, isDay) => {
        if (code === 0) return isDay ? <Sun size={20} color="#fcd34d" /> : <Moon size={20} color="#d1fae5" />;
        if (code === 1 || code === 2) return isDay ? <CloudSun size={20} color="#fff" /> : <CloudMoon size={20} color="#94a3b8" />;
        if (code === 3) return <Cloud size={20} color="#94a3b8" />;
        if ([45, 48].includes(code)) return <CloudFog size={20} color="#cbd5e1" />;
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain size={20} color="#60a5fa" />;
        if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow size={20} color="#e2e8f0" />;
        if ([95, 96, 99].includes(code)) return <CloudLightning size={20} color="#fbbf24" />;
        return <Sun size={20} />;
    };

    return (
        <motion.div
            className="hourly-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h3>Hourly Forecast</h3>
            <div className="hourly-scroll glass-panel" ref={scrollRef}>
                {next24Hours.map((timeStr, index) => {
                    const date = new Date(timeStr);
                    const hour = date.getHours();
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour % 12 || 12;

                    return (
                        <motion.div
                            key={index}
                            className="hourly-card"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="hour-label">{displayHour} <span className="ampm">{ampm}</span></span>
                            <div className="icon-wrapper">
                                {getIcon(codes[index], isDays[index])}
                            </div>
                            <span className="temp-label">{Math.round(temps[index])}°</span>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default HourlyForecast;
