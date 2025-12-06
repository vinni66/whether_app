import './AirQualityCard.css';

function AirQualityCard({ aqi }) {
    if (aqi === null || aqi === undefined) return null;

    let status = 'Good';
    let colorClass = 'aqi-good';
    let description = 'Air quality is considered satisfactory, and air pollution poses little or no risk.';

    if (aqi > 50) {
        status = 'Moderate';
        colorClass = 'aqi-moderate';
        description = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern.';
    }
    if (aqi > 100) {
        status = 'Unhealthy for Sensitive Groups';
        colorClass = 'aqi-sensitive';
        description = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    }
    if (aqi > 150) {
        status = 'Unhealthy';
        colorClass = 'aqi-unhealthy';
        description = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
    }
    if (aqi > 200) {
        status = 'Very Unhealthy';
        colorClass = 'aqi-very-unhealthy';
        description = 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    }
    if (aqi > 300) {
        status = 'Hazardous';
        colorClass = 'aqi-hazardous';
        description = 'Health alert: everyone may experience more serious health effects.';
    }

    return (
        <div className={`air-quality-card glass-panel ${colorClass}`}>
            <div className="aqi-header">
                <h3>Air Quality Index</h3>
                <span className="aqi-value">{aqi}</span>
            </div>
            <div className="aqi-status">
                <h4>{status}</h4>
                <p>{description}</p>
            </div>
            <div className="aqi-bar-container">
                <div className="aqi-bar" style={{ width: `${Math.min((aqi / 300) * 100, 100)}%` }}></div>
            </div>
        </div>
    );
}

export default AirQualityCard;
