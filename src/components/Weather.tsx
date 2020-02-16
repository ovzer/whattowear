import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { getWeather, IWeather } from '../functions/getWeather';
import { getSunAltitude } from '../functions/getSunAltitude';
import { getApparentTemperature } from '../functions/getApparentTemperature';
import { WeatherIcon } from '../components/WeatherIcon';

interface IWeatherProps {
  coordinates: Coordinates | undefined;
}

export const Weather: React.FC<IWeatherProps> = (props) => {
  const { coordinates } = props;
  const [weather, setWeather] = useState<IWeather | undefined>();
  const [apparentTemperature, setApparentTemperature] = useState<number | undefined>();
  const [night, setNight] = useState(false);

  useEffect(() => {
    const asyncGetWeather = async() => {
      if (coordinates !== undefined) {
        const [weather, sunAltitude] = await Promise.all([
          getWeather(coordinates),
          getSunAltitude(coordinates),
        ]);

        setNight(sunAltitude < 0);
        setApparentTemperature(getApparentTemperature(weather, sunAltitude));
        setWeather(weather);
      }
    };
    asyncGetWeather();
  }, [coordinates]);

  return (
    <Box>
      {weather && night && <WeatherIcon symbol={weather.symbol} night={night} />}
      {weather && apparentTemperature ? `${weather.temperature.toFixed(1)}°C (${apparentTemperature.toFixed(1)}°C)` : '-'}
    </Box>
  );
};

