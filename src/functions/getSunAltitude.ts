import sunCalc from 'suncalc';

import { ISimpleCoordinates } from './getAutocompleteSuggestions';

export const getSunAltitude = (coordinates: ISimpleCoordinates): number => {
  const sunPosition = sunCalc.getPosition(
    new Date(),
    coordinates.lat,
    coordinates.lon,
  );
  return (sunPosition.altitude * 180) / Math.PI;
};
