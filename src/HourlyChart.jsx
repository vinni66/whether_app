import { useMemo, useContext } from 'react';
import { UnitContext } from './UnitContext';

function HourlyChart({ temps, width = 600, height = 100 }) {
    const { units } = useContext(UnitContext);

    const pathData = useMemo(() => {
        if (!temps || temps.length === 0) return '';

        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);
        const range = maxTemp - minTemp || 1; // Avoid division by zero

        // Chart Configuration
        const padding = 10;
        const chartHeight = height - padding * 2;
        const chartWidth = width;
        const stepX = chartWidth / (temps.length - 1);

        // Generate Points
        const points = temps.map((temp, index) => {
            const x = index * stepX;
            // Invert Y axis because SVG origin is top-left
            const normalizedTemp = (temp - minTemp) / range;
            const y = chartHeight - (normalizedTemp * chartHeight) + padding;
            return `${x},${y}`;
        });

        // Create Path Commands (Smooth curve - varying 'L' for now, could use bezier 'C' later)
        // Using simple Lines for stability for now.
        // L x y
        const d = `M ${points.join(' L ')}`;

        // Area Path
        const areaD = `${d} L ${chartWidth},${height} L 0,${height} Z`;

        return { stroke: d, area: areaD };

    }, [temps, width, height]);

    if (!pathData) return null;

    return (
        <div className="hourly-chart-container" style={{ width: '100%', overflow: 'hidden', marginTop: '1rem' }}>
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>
                </defs>

                {/* Area Fill */}
                <path d={pathData.area} fill="url(#chartGradient)" />

                {/* Line Stroke */}
                <path d={pathData.stroke} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}

export default HourlyChart;
