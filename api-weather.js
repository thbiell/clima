import axios from "axios";

const baseUrl = 'https://api.open-meteo.com/v1/forecast';


const defaultLocation = {
    lat: '-23.5475',
    long: '-46.6361'
}

const hourly = ['temperature_2m', 'precipitation_probability'];
const timezone = 'America%2FSao_Paulo';
const days = 3;
const buildUrl = (location, values, timezone, forecastDays) => {
    return `${baseUrl}?latitude=${location.lat}&longitude=${location.long}` +
        `&hourly=${values.toString()}&timezone=${timezone}&forecast_days=${forecastDays}`
}

export const getForecast = () => {
    return axios.get(buildUrl(defaultLocation, hourly, timezone, days));    
}