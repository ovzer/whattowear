import { Box, useTheme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { getWeather, IWeather } from '../functions/getWeather';
import { getSunAltitude } from '../functions/getSunAltitude';
import { getApparentTemperature } from '../functions/getApparentTemperature';
import { WeatherIcon } from '../components/WeatherIcon';
import { ISimpleCoordinates } from '../functions/getAutocompleteSuggestions';

interface IWeatherProps {
  coordinates: ISimpleCoordinates | undefined;
  setApparentTemperature: Function;
  apparentTemperature: number | undefined;
}

const dayNightLimit = -10; // Sun altitude in degrees to separate day and night

export const Weather: React.FC<IWeatherProps> = (props) => {
  const { coordinates, setApparentTemperature, apparentTemperature } = props;
  const [weather, setWeather] = useState<IWeather | undefined>();
  const [night, setNight] = useState<boolean | undefined>();
  const theme = useTheme();

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
  }, [coordinates, setApparentTemperature]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {weather && night !== undefined && <WeatherIcon symbol={weather.symbol} night={night} color={theme.palette.common.white} />}
      {weather && apparentTemperature
        ? (
          <>
            <Typography variant="h4">{`(${apparentTemperature.toFixed(1)}°C)`}</Typography>
            <Typography color="textSecondary">{`${weather.temperature.toFixed(1)}°C`}</Typography>
          </>
        )
        : <Typography variant="h4">-</Typography>}
    </Box>
  );
};
