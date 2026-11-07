/*
Contains functions for fetching weather data from Open-Meteo (free, no API key required)
    - geocoding API converts a city name to coordinates
    - forecast API returns today's weather for those coordinates
*/

import clearDayIcon from "../../assets/icons/clear_day.svg";
import clearNightIcon from "../../assets/icons/clear_night.svg";
import partlyCloudyDayIcon from "../../assets/icons/partly_cloudy_day.svg";
import partlyCloudyNightIcon from "../../assets/partly_cloudy_night.svg";
import overcastIcon from "../../assets/icons/overcast.svg";
import foggyIcon from "../../assets/icons/foggy.svg";
import rainIcon from "../../assets/icons/rain.svg";
import snowIcon from "../../assets/icons/snow.svg";
import thunderstormIcon from "../../assets/icons/thunderstorm.svg";
import unknownIcon from "../../assets/icons/thermometer-svgrepo-com.svg";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// look up coordinates for a city name
export async function getCoordinates(city) {
    try {
        const params = new URLSearchParams({ name: city, count: 1 });
        const response = await fetch(`${GEOCODING_URL}?${params}`);
        if (!response.ok) {
            return { data: null, error: "Unable to look up location." };
        }

        const json = await response.json();
        if (!json.results || json.results.length === 0) {
            return { data: null, error: `No location found for "${city}".` };
        }

        const { name, admin1, latitude, longitude } = json.results[0];
        return {
            data: {
                name: admin1 ? `${name}, ${admin1}` : name,
                latitude,
                longitude,
            },
            error: null,
        };
    } catch {
        return { data: null, error: "Unable to look up location." };
    }
}

// convert a WMO weather code into an icon and label for the current sky status
// https://open-meteo.com/en/docs (see "WMO Weather interpretation codes")
function getSkyStatus(code, isDay) {
    if (code === 0) {
        return isDay ? { icon: clearDayIcon, label: "Clear" } : { icon: clearNightIcon, label: "Clear" };
    }
    if (code === 1 || code === 2) {
        return isDay
            ? { icon: partlyCloudyDayIcon, label: "Partly Cloudy" }
            : { icon: partlyCloudyNightIcon, label: "Partly Cloudy" };
    }
    if (code === 3) return { icon: overcastIcon, label: "Overcast" };
    if (code === 45 || code === 48) return { icon: foggyIcon, label: "Fog" };
    if (code >= 51 && code <= 57) return { icon: rainIcon, label: "Drizzle" };
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { icon: rainIcon, label: "Rain" };
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { icon: snowIcon, label: "Snow" };
    if (code >= 95) return { icon: thunderstormIcon, label: "Thunderstorm" };
    return { icon: unknownIcon, label: "Unknown" };
}

// get today's high, low, humidity, wind speed, and sky status for a set of coordinates
export async function getTodaysWeather(latitude, longitude) {
    try {
        const params = new URLSearchParams({
            latitude,
            longitude,
            daily: "temperature_2m_max,temperature_2m_min",
            current: "relative_humidity_2m,wind_speed_10m,weather_code,is_day",
            temperature_unit: "fahrenheit",
            wind_speed_unit: "mph",
            timezone: "auto",
            forecast_days: 1,
        });
        const response = await fetch(`${FORECAST_URL}?${params}`);
        if (!response.ok) {
            return { data: null, error: "Unable to load weather." };
        }

        const json = await response.json();
        return {
            data: {
                high: Math.round(json.daily.temperature_2m_max[0]),
                low: Math.round(json.daily.temperature_2m_min[0]),
                humidity: json.current.relative_humidity_2m,
                windSpeed: Math.round(json.current.wind_speed_10m),
                sky: getSkyStatus(json.current.weather_code, json.current.is_day),
            },
            error: null,
        };
    } catch {
        return { data: null, error: "Unable to load weather." };
    }
}
