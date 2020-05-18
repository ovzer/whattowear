
import React, { useEffect, useState } from 'react';
import { Box, Fade } from '@material-ui/core';

import { getWeather, IWeather } from '../../functions/getWeather';
import { Weather } from '../../components/Weather';
import { Clothes } from '../../components/Clothes';
import { ISimpleCoordinates } from '../../functions/getAutocompleteSuggestions';
import { getSunAltitude } from '../../functions/getSunAltitude';

interface IAsyncContent {
  coordinates: ISimpleCoordinates | undefined;
}

export const AsyncContent: React.FC<IAsyncContent> = (props) => {
  const { coordinates } = props;
  const [weather, setWeather] = useState<IWeather | undefined>();
  const [awaitedWeather, setAwaitedWeather] = useState<IWeather | undefined>();
  const [showContent, setShowContent] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const sunAltitude = coordinates ? getSunAltitude(coordinates) : 0;

  useEffect(() => {
    const asyncGetWeather = async() => {
      if (coordinates === undefined) {
        setWeather(undefined);
      } else {
        const weather = await getWeather(coordinates);
        if (weather !== null) {
          setWeather(weather);
        }
      }
    };
    setShowContent(false);
    asyncGetWeather();
  }, [coordinates]);

  useEffect(() => {
    if (weather && isHidden) {
      setAwaitedWeather(weather);
      setShowContent(true);
    }
  }, [isHidden, weather]);

  return (
    <Fade
      in={showContent}
      timeout={{ enter: 1000, exit: 300 }}
      onEnter={() => setIsHidden(false)}
      onExited={() => setIsHidden(true)}
    >
      <Box>
        {awaitedWeather && (
          <>
            <Box m={1}>
              <Weather
                sunAltitude={sunAltitude}
                weather={awaitedWeather}
              />
            </Box>
            <Clothes apparentTemperature={awaitedWeather.apparentTemperature} />
          </>
        )}
      </Box>
    </Fade>
  );
};
