import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// removed unused Search, Loader2 imports
import { WeatherContext } from './WeatherContext';
import SearchAutocomplete from './SearchAutocomplete';
import WeatherCard from './WeatherCard';
import HourlyForecast from './HourlyForecast';
import WeatherGrid from './WeatherGrid';
import AirQualityCard from './AirQualityCard';
import Skeleton from './Skeleton';
import './Home.css';

function Home() {
    const { weatherData, error, loading } = useContext(WeatherContext);
    // Removed local query state as it's handled in SearchAutocomplete



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="dashboard-container">
            {/* Header: Search */}
            <header className="dashboard-header">
                <div className="welcome-text">
                    <h1>Weather Dashboard</h1>
                    <p>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="search-bar-container">
                    <SearchAutocomplete />
                </div>
            </header>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        className="error-message glass-panel"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading State */}
            {loading && (
                <div className="loading-grid">
                    <Skeleton height="100%" width="100%" style={{ borderRadius: '24px' }} />
                    <Skeleton height="100%" width="100%" style={{ borderRadius: '24px' }} />
                    <Skeleton height="100%" width="100%" style={{ borderRadius: '24px' }} />
                </div>
            )}

            {/* Empty State */}
            {!weatherData && !loading && !error && (
                <div className="empty-state glass-panel">
                    <h2>Welcome!</h2>
                    <p>Enter a city name to get started.</p>
                </div>
            )}

            {/* Dashboard Content */}
            {weatherData && (
                <motion.div
                    className="dashboard-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="main-card-area" variants={itemVariants}>
                        <WeatherCard data={weatherData} />
                    </motion.div>

                    <motion.div className="grid-area" variants={itemVariants}>
                        <WeatherGrid data={weatherData} />
                    </motion.div>

                    <motion.div className="hourly-area" variants={itemVariants}>
                        {weatherData.hourly && <HourlyForecast hourlyData={weatherData.hourly} />}
                    </motion.div>

                    <motion.div className="aqi-area" variants={itemVariants}>
                        <AirQualityCard aqi={weatherData.aqi} />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

export default Home;
