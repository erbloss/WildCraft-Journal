import { useState, useEffect } from "react";
import { getCoordinates, getTodaysWeather } from "./weatherService.js";
import ping from "../../assets/icons/map_ping.svg";
import "../../styles/styles.css";

/*
Displays today's high/low temperature, humidity, and wind speed for the user's selected location.
The last searched location is saved in localStorage so it persists between visits.
*/

const LOCATION_KEY = "weatherLocation";

// read the previously saved location, if any
function getSavedLocation() {
    try {
        const saved = localStorage.getItem(LOCATION_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
}

export default function Weather() {

    const [cityInput, setCityInput] = useState("");
    const [location, setLocation] = useState(getSavedLocation);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(location !== null);
    const [error, setError] = useState("");

    async function loadWeather(loc) {
        setLoading(true);
        setError("");

        const { data, error } = await getTodaysWeather(loc.latitude, loc.longitude);
        if (error) {
            setError(error);
        } else {
            setWeather(data);
        }
        setLoading(false);
    }

    // load weather for the previously saved location on first render
    useEffect(() => {
        if (!location) {
            return;
        }
        getTodaysWeather(location.latitude, location.longitude).then(({ data, error }) => {
            if (error) {
                setError(error);
            } else {
                setWeather(data);
            }
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!cityInput.trim()) {
            return;
        }

        setLoading(true);
        setError("");

        const { data: loc, error } = await getCoordinates(cityInput.trim());
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        localStorage.setItem(LOCATION_KEY, JSON.stringify(loc));
        setLocation(loc);
        setCityInput("");
        await loadWeather(loc);
    }

    return (
        <div className="white-backer mb-10">
            <h2>Today's Forecast:</h2>

            {/* Location search */}
            <form className="weather-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <button type="submit" disabled={loading}>➜</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && weather && location && (
                <div>

                    <div className="weather-sky">
                        <img
                            className="weather-icon"
                            src={weather.sky.icon}
                            alt={weather.sky.label}
                            title={weather.sky.label}
                        />
                    </div>

                    <h3 className="weather-location">
                        <img src={ping} alt="map marker image" width="25"></img>
                        <strong>{location.name}</strong></h3>

                    <p><strong>High:</strong> {weather.high}°F</p>
                    <p><strong>Low:</strong> {weather.low}°F</p>
                    <p><strong>Humidity:</strong> {weather.humidity}%</p>
                    <p><strong>Wind:</strong> {weather.windSpeed} mph</p>
                </div>
            )}

            {!loading && !error && !location && (
                <p>Enter a city to see today's weather.</p>
            )}
        </div>
    )
}
