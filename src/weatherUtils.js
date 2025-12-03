// WMO Weather interpretation codes
// (https://open-meteo.com/en/docs)

export function getWeatherInfo(code) {
  const weatherMap = {
    0: { description: 'Clear sky', icon: '01d', background: 'bg-sunny' },
    1: { description: 'Mainly clear', icon: '02d', background: 'bg-sunny' },
    2: { description: 'Partly cloudy', icon: '03d', background: 'bg-cloudy' },
    3: { description: 'Overcast', icon: '04d', background: 'bg-cloudy' },
    45: { description: 'Fog', icon: '50d', background: 'bg-cloudy' },
    46: { description: 'Depositing rime fog', icon: '50d', background: 'bg-cloudy' },
    51: { description: 'Light drizzle', icon: '09d', background: 'bg-rainy' },
    53: { description: 'Moderate drizzle', icon: '09d', background: 'bg-rainy' },
    55: { description: 'Dense drizzle', icon: '09d', background: 'bg-rainy' },
    56: { description: 'Light freezing drizzle', icon: '09d', background: 'bg-rainy' },
    57: { description: 'Dense freezing drizzle', icon: '09d', background: 'bg-rainy' },
    61: { description: 'Slight rain', icon: '10d', background: 'bg-rainy' },
    63: { description: 'Moderate rain', icon: '10d', background: 'bg-rainy' },
    65: { description: 'Heavy rain', icon: '10d', background: 'bg-rainy' },
    66: { description: 'Light freezing rain', icon: '13d', background: 'bg-rainy' },
    67: { description: 'Heavy freezing rain', icon: '13d', background: 'bg-rainy' },
    71: { description: 'Slight snow fall', icon: '13d', background: 'bg-snowy' },
    73: { description: 'Moderate snow fall', icon: '13d', background: 'bg-snowy' },
    75: { description: 'Heavy snow fall', icon: '13d', background: 'bg-snowy' },
    77: { description: 'Snow grains', icon: '13d', background: 'bg-snowy' },
    80: { description: 'Slight rain showers', icon: '09d', background: 'bg-rainy' },
    81: { description: 'Moderate rain showers', icon: '09d', background: 'bg-rainy' },
    82: { description: 'Violent rain showers', icon: '09d', background: 'bg-rainy' },
    85: { description: 'Slight snow showers', icon: '13d', background: 'bg-snowy' },
    86: { description: 'Heavy snow showers', icon: '13d', background: 'bg-snowy' },
    95: { description: 'Thunderstorm', icon: '11d', background: 'bg-rainy' },
    96: { description: 'Thunderstorm with slight hail', icon: '11d', background: 'bg-rainy' },
    99: { description: 'Thunderstorm with heavy hail', icon: '11d', background: 'bg-rainy' },
  };

  return weatherMap[code] || { description: 'Unknown', icon: '50d', background: 'bg-default' };
}