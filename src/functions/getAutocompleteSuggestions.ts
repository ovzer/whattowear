import { geocoderApiKey } from '../config';

export interface IAutocompleteSuggestion {
  locationName: string;
  secondaryText?: string;
  coordinates?: ISimpleCoordinates;
  locationId?: string;
}

export interface ISimpleCoordinates {
  lat: number;
  lon: number;
}

interface IAddress {
  country?: string;
  state?: string;
  county?: string;
  city?: string;
  district?: string;
  street?: string;
}

const makeDisplayName = (address: IAddress, number: number): string => {
  const primaryText = [
    address.street,
    address.district,
    address.city,
    address.county,
    address.state,
    address.country,
  ];
  return primaryText
    .filter((str) => str)
    .slice(0, number)
    .join(', ');
};

export const getAutocompleteSuggestions = async(
  searchString: string,
  boldTag?: string,
): Promise<IAutocompleteSuggestion[]> => {
  if (searchString === '') return [];

  const apiUrl = new URL(
    'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json',
  );
  apiUrl.searchParams.append('apiKey', geocoderApiKey);
  apiUrl.searchParams.append('query', searchString);
  apiUrl.searchParams.append('maxresults', '4');
  apiUrl.searchParams.append('resultType', 'areas');
  if (boldTag) {
    apiUrl.searchParams.append('beginHighlight', boldTag);
    apiUrl.searchParams.append('endHighlight', boldTag);
  }

  const response = await fetch(apiUrl.href);
  if (!response.ok) return [];
  const json = await response.json();

  return json.suggestions.map((location: any) => {
    return {
      locationName: makeDisplayName(location.address, 1),
      secondaryText: makeDisplayName(location.address, 4),
      locationId: location.locationId,
    };
  });
};
