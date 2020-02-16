import sunCalc from 'suncalc';

export const getSunAltitude = async(coordinates: Coordinates): Promise<number> => {
  const sunPosition = sunCalc.getPosition(new Date(), coordinates.latitude, coordinates.longitude);
  return sunPosition.altitude * 180 / Math.PI;
};
