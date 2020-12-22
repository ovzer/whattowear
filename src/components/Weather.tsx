import { Box, useTheme, Typography } from '@material-ui/core';
import React from 'react';

import { WeatherIcon } from '../components/WeatherIcon';
import { IWeather } from '../functions/getWeather';

interface IWeatherProps {
  sunAltitude: number;
  weather: IWeather;
}

const dayNightLimit = -10; // Sun altitude in degrees to separate day and night

export const Weather: React.FC<IWeatherProps> = (props) => {
  const { sunAltitude, weather } = props;
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <WeatherIcon
        symbol={weather.symbol}
        night={sunAltitude < dayNightLimit}
        color={theme.palette.common.white}
      />
      <Typography color="textSecondary">{`${weather.temperature.toFixed(
        1,
      )}°C`}
      </Typography>
      <Typography color="textSecondary">Føles som</Typography>
      <Typography variant="h4">{`${weather.apparentTemperature.toFixed(
        1,
      )}°C`}
      </Typography>
    </Box>
  );
};
