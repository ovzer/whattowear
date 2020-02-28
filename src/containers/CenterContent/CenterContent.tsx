import React, { useState } from 'react';
import { Box } from '@material-ui/core';

import { Location } from '../../components/Location';
import { Weather } from '../../components/Weather';
import { Clothes } from '../../components/Clothes';
import { IAutocompleteSuggestion } from '../../functions/getAutocompleteSuggestions';

export const CenterContent = () => {
  const [location, setLocation] = useState<IAutocompleteSuggestion | null>();

  return (
    <Box p={1} display="flex" alignItems="center" flexDirection="column">
      <Box m={1} flex={1} maxWidth={300} width="100%">
        <Location setLocation={setLocation} location={location || null} />
      </Box>
      <Box m={1}>
        <Weather coordinates={location?.coordinates} />
      </Box>
      <Clothes />
    </Box>
  );
};
