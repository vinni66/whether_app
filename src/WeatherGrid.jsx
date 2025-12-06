import { Droplets, Wind, Sun, Sunset, Gauge, Eye, CloudRain } from 'lucide-react';
import './WeatherGrid.css';

function WeatherGrid({ data }) {
    if (!data) return null;

    const { main, wind, sys, uv } = data;

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        // Open-Meteo returns ISO strings for daily times
        return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const items = [
        {
            icon: <Sun size={24} className="text-orange-400" />,
            label: "UV Index",
            value: uv !== undefined ? uv : 'N/A',
            desc: uv > 5 ? 'High' : 'Low'
        },
        {
            icon: <Wind size={24} className="text-blue-400" />,
            label: "Wind",
            value: `${wind.speed} ${data.units === 'imperial' ? 'mph' : 'km/h'}`, // Note: Units need to be passed or handled contextually, assuming context availability or simplified display
            desc: wind.deg ? `${wind.deg}°` : ''
        },
        {
            icon: <Droplets size={24} className="text-blue-300" />,
            label: "Humidity",
            value: `${main.humidity}%`,
            desc: "Dew Point: N/A" // could calculate if needed, skipping for now
        },
        {
            icon: <Gauge size={24} className="text-gray-400" />,
            label: "Pressure",
            value: `${main.pressure} hPa`,
            desc: ""
        },
        {
            icon: <Sunset size={24} className="text-orange-300" />,
            label: "Sunset",
            value: sys?.sunset ? formatTime(sys.sunset) : 'N/A',
            desc: `Sunrise: ${sys?.sunrise ? formatTime(sys.sunrise) : 'N/A'}`
        },
        {
            icon: <Eye size={24} className="text-purple-300" />,
            label: "Feels Like",
            value: `${Math.round(main.feels_like)}°`,
            desc: ""
        },
        {
            icon: <CloudRain size={24} className="text-cyan-300" />,
            label: "Rain Chance",
            value: `${main.precip_prob}%`,
            desc: "Daily Max"
        }
    ];

    return (
        <div className="weather-grid">
            {items.map((item, index) => (
                <div key={index} className="grid-item glass-panel">
                    <div className="grid-icon">{item.icon}</div>
                    <div className="grid-info">
                        <span className="grid-label">{item.label}</span>
                        <span className="grid-value">{item.value}</span>
                        {item.desc && <span className="grid-desc">{item.desc}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default WeatherGrid;
