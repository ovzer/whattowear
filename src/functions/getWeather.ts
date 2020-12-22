import { parseStringPromise } from 'xml2js';
import moment from 'moment';

import { ISimpleCoordinates } from './getAutocompleteSuggestions';
import { getSunAltitude } from './getSunAltitude';
import { getApparentTemperature } from './getApparentTemperature';

export interface IWeather {
  temperature: number;
  apparentTemperature: number;
  cloudiness: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  symbol: number;
}

export const getWeather = async(
  coordinates: ISimpleCoordinates,
): Promise<IWeather | null> => {
  const requestUrl = new URL(
    'https://api.met.no/weatherapi/locationforecast/1.9/',
  );
  requestUrl.searchParams.append('lat', coordinates.lat.toString());
  requestUrl.searchParams.append('lon', coordinates.lon.toString());

  try {
    const response = await fetch(requestUrl.href);
    const text = await response.text();
    const result = await parseStringPromise(text);
    const forecastArray = result.weatherdata.product[0].time;
    const sunAltitude = getSunAltitude(coordinates);
    const currentForecast = forecastArray
      .filter((forecast: any) => {
        return !moment().endOf('hour').diff(moment(forecast.$.from), 'minutes');
      })
      .reduce((returnArray: any, forecast: any) => {
        return { ...forecast.location[0], ...returnArray };
      }, {});

    const weather: IWeather = {
      temperature: +currentForecast.temperature[0].$.value,
      apparentTemperature: 0,
      cloudiness: +currentForecast.cloudiness[0].$.percent,
      humidity: +currentForecast.humidity[0].$.value,
      windSpeed: +currentForecast.windSpeed[0].$.mps,
      precipitation: +currentForecast.precipitation[0].$.value,
      symbol: parseInt(currentForecast.symbol[0].$.number),
    };

    return {
      ...weather,
      apparentTemperature: getApparentTemperature(weather, sunAltitude),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
