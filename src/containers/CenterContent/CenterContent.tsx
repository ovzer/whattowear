import React, { useState } from 'react';
import { Box } from '@material-ui/core';

import { Location } from '../../components/Location';
import { AsyncContent } from '../../containers/AsyncContent/AsyncContent';
import { IAutocompleteSuggestion } from '../../functions/getAutocompleteSuggestions';

export const CenterContent = () => {
  const [location, setLocation] = useState<IAutocompleteSuggestion | null>();

  return (
    <Box p={1} display="flex" alignItems="center" flexDirection="column">
      <Box m={1} flex={1} maxWidth={300} width="100%" textAlign="center">
        <Location setLocation={setLocation} location={location || null} />
      </Box>
      <AsyncContent coordinates={location?.coordinates} />
    </Box>
  );
};
