import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { getWeather, IWeather } from '../functions/getWeather';
import { getSunAltitude } from '../functions/getSunAltitude';
import { getApparentTemperature } from '../functions/getApparentTemperature';
import { WeatherIcon } from '../components/WeatherIcon';
import { ISimpleCoordinates } from '../functions/getAutocompleteSuggestions';

interface IWeatherProps {
  coordinates: ISimpleCoordinates | undefined;
}

const dayNightLimit = -10; // Sun altitude in degrees to separate day and night

export const Weather: React.FC<IWeatherProps> = (props) => {
  const { coordinates } = props;
  const [weather, setWeather] = useState<IWeather | undefined>();
  const [apparentTemperature, setApparentTemperature] = useState<number | undefined>();
  const [night, setNight] = useState<boolean | undefined>();

  useEffect(() => {
    const asyncGetWeather = async() => {
      if (coordinates === undefined) {
        setWeather(undefined);
      } else {
        const [weather, sunAltitude] = await Promise.all([
          getWeather(coordinates),
          getSunAltitude(coordinates),
        ]);

        if (weather !== null && sunAltitude !== null) {
          setNight(sunAltitude < dayNightLimit);
          setApparentTemperature(getApparentTemperature(weather, sunAltitude));
          setWeather(weather);
        }
      }
    };
    asyncGetWeather();
  }, [coordinates]);

  return (
    <Box>
      {weather && night !== undefined && <WeatherIcon symbol={weather.symbol} night={night} />}
      {weather && apparentTemperature ? `${weather.temperature.toFixed(1)}°C (${apparentTemperature.toFixed(1)}°C)` : '-'}
    </Box>
  );
};

