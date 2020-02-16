import { parseStringPromise } from 'xml2js';

export interface IWeather {
  temperature: number;
  cloudiness: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  symbol: number;
}

export const getWeather = async(coordinates: Coordinates): Promise<IWeather> => {
  const requestUrl = new URL('https://api.met.no/weatherapi/locationforecast/1.9/');
  requestUrl.searchParams.append('lat', coordinates.latitude.toString());
  requestUrl.searchParams.append('lon', coordinates.longitude.toString());

  const response = await fetch(requestUrl.href);
  const text = await response.text();
  const result = await parseStringPromise(text);
  console.log(result.weatherdata.product[0].time[3].location[0].symbol[0].$.number);
  return {
    temperature: +result.weatherdata.product[0].time[0].location[0].temperature[0].$.value,
    cloudiness: +result.weatherdata.product[0].time[0].location[0].cloudiness[0].$.percent,
    humidity: +result.weatherdata.product[0].time[0].location[0].humidity[0].$.value,
    windSpeed: +result.weatherdata.product[0].time[0].location[0].windSpeed[0].$.mps,
    precipitation: +result.weatherdata.product[0].time[3].location[0].precipitation[0].$.value,
    symbol: parseInt(result.weatherdata.product[0].time[3].location[0].symbol[0].$.number),
  };
};
