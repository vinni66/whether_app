import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { useWeather } from './WeatherContext';
import './SearchAutocomplete.css';

function SearchAutocomplete() {
    const { fetchWeatherData, loading } = useWeather();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Fetch cities from Open-Meteo Geocoding API
    const fetchSuggestions = async (input) => {
        if (!input || input.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=5&language=en&format=json`
            );
            const data = await response.json();
            if (data.results) {
                setSuggestions(data.results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Create debounced fetcher
    const debouncedFetch = useCallback(debounce(fetchSuggestions, 500), []);

    useEffect(() => {
        debouncedFetch(query);
    }, [query, debouncedFetch]);

    // Handle clicks outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (city) => {
        setQuery(`${city.name}, ${city.country}`);
        setShowSuggestions(false);
        // Pass full object to context for accurate fetching
        fetchWeatherData(city);
    };

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    // We can resolve name first or just pass coords. 
                    // Let context handle reverse geocoding if it wants, or just pass nameless
                    // Actually Context's fetchWeatherData handles {latitude, longitude, name}
                    // Let's rely on Context logic for "current position" which usually involves reverse geo
                    // But here we can't easily access the internal loadUserLocation logic of context without refactoring.
                    // Instead, we'll manually emulate what context does or pass a "use current location" signal.
                    // Or properly: fetch reverse geo here to set name in search bar.

                    try {
                        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&format=json`);
                        const data = await res.json();
                        const name = data.name || (data.results && data.results[0].name) || "Your Location";
                        setQuery(name);
                        fetchWeatherData({ latitude, longitude, name });
                    } catch (e) {
                        fetchWeatherData({ latitude, longitude, name: "Your Location" });
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <div className="search-container" ref={wrapperRef}>
            <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                />
                {query && (
                    <button className="location-button" onClick={() => { setQuery(''); setSuggestions([]); }}>
                        <X size={18} />
                    </button>
                )}
                <button className="location-button" onClick={handleGeolocation} title="Use my location">
                    <MapPin size={20} />
                </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((city) => (
                        <li key={city.id} className="suggestion-item" onClick={() => handleSelect(city)}>
                            <span className="suggestion-name">{city.name}</span>
                            <span className="suggestion-details">
                                {[city.admin1, city.country].filter(Boolean).join(', ')}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchAutocomplete;
