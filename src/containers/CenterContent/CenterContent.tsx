import React, { useState } from 'react';
import { Box } from '@material-ui/core';

import { Location } from '../../components/Location';
import { Weather } from '../../components/Weather';
import { Clothes } from '../../components/Clothes';

export const CenterContent = () => {
  const [coordinates, setCoordinates] = useState();

  return (
    <Box p={1} display="flex" alignItems="center" flexDirection="column">
      <Box m={1}>
        <Location setCoordinates={setCoordinates} />
      </Box>
      <Box m={1}>
        <Weather coordinates={coordinates} />
      </Box>
      <Clothes />
    </Box>
  );
};
