import { IAutocompleteSuggestion, ISimpleCoordinates } from './getAutocompleteSuggestions';
import { geocoderApiKey } from '../config';

export const getCoordinates = async(location: IAutocompleteSuggestion): Promise<ISimpleCoordinates | null> => {
  if (!location.locationId) return null;

  const apiUrl = new URL('https://geocoder.ls.hereapi.com/6.2/geocode.json');
  apiUrl.searchParams.append('apiKey', geocoderApiKey);
  apiUrl.searchParams.append('locationid', location.locationId);

  const response = await fetch(apiUrl.href);

  if (!response.ok) return null;

  const json = await response.json();

  return {
    lat: json.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
    lon: json.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
  };
};
