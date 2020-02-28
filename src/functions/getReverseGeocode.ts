import { IAutocompleteSuggestion } from './getAutocompleteSuggestions';
import { geocoderApiKey } from '../config';

export const getReverseGeocode = async(coordinates: Coordinates): Promise<IAutocompleteSuggestion | null> => {
  if (!coordinates) return null;

  const apiUrl = new URL('https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json');
  apiUrl.searchParams.append('apiKey', geocoderApiKey);
  apiUrl.searchParams.append('prox', `${coordinates.latitude},${coordinates.longitude}`);
  apiUrl.searchParams.append('mode', 'retrieveAddresses');
  apiUrl.searchParams.append('maxresults', '1');

  try {
    const response = await fetch(apiUrl.href);

    if (!response.ok) throw response;

    const json = await response.json();
    const address = json.Response.View[0].Result[0].Location.Address;
    console.log(address);

    /*   const primaryText = [
    json.address.road,
    json.address.suburb,
    json.address.city,
    json.address.country,
  ];
  const primaryTextString = primaryText.filter((str) => str).slice(0, 2).join(', '); */

    return {
      locationName: address.Street || address.City,
      secondaryText: address.Label,
      coordinates: {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
