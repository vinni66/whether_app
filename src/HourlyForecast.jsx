import { useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { UnitContext } from './UnitContext';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';
import HourlyChart from './HourlyChart';
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
                                <AnimatedWeatherIcon code={codes[index]} isDay={isDays[index]} size={32} />
                            </div>
                            <span className="temp-label">{Math.round(temps[index])}°</span>
                        </motion.div>
                    );
                })}
            </div>

            <HourlyChart temps={temps} />
        </motion.div>
    );
}

export default HourlyForecast;
