import { IWeather } from './getWeather';

const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
};

export const getApparentTemperature = (weather: IWeather, sunAltitude: number) => {
  const { cloudiness, humidity, temperature, windSpeed } = weather;
  let radiation = 0;
  if (sunAltitude > 0) {
    radiation = 114 * Math.sin(toRadians(sunAltitude)) * ((100 - cloudiness) / 100);
  }
  const humidityHeat = 0.348 * ((humidity / 100) * 6.105 * Math.exp((17.27 * temperature) / (237.7 + temperature)));
  const windChill = 0.70 * windSpeed;
  const sunHeat = 0.70 * (radiation / (windSpeed + 10));
  const apparentTemperature = temperature + humidityHeat - windChill + sunHeat - 4.25;
  return Math.round(apparentTemperature * 10) / 10;
};
