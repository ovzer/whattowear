import { parseStringPromise } from "xml2js";

export const getWeather = async () => {
    const response = await fetch('https://api.met.no/weatherapi/locationforecast/1.9/?lat=60.10&lon=9.58')
    const text = await response.text();
    const result = await parseStringPromise(text)
    console.log(result.weatherdata.product[0].time[0].location[0].temperature[0].$.value);
}