import { InputAdornment, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getAutocompleteSuggestions } from '../functions/getAutocompleteSuggestions';

interface ILocationProps {
  setCoordinates: Function;
}

export const Location: React.FC<ILocationProps> = (props) => {
  const { setCoordinates } = props;
  const [locationText, setLocationText] = useState('');
  const [options, setOptions] = useState([] as any);

  useEffect(() => {
    const getLocation = async() => {
      try {
        const resolve = (position: Position) => {
          setCoordinates(position.coords);
          setLocationText(`${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`);
        };
        const reject = (error: PositionError) => {
          console.error('Geolocation error', error);
        };
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } catch (error) {
        console.error('Geolocation error:', error);
      }
    };
    getLocation();
  }, [setCoordinates]);

  const handleChange = async(event: any, newValue: string | null) => {
    if (newValue !== null) {
      setLocationText(newValue);
      const autocompleteSuggestions = await getAutocompleteSuggestions(newValue);
      setOptions(autocompleteSuggestions);
    } else {
      setLocationText('');
    }
  };

  return (
    <Autocomplete
      value={locationText}
      onChange={handleChange}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="Location" variant="outlined" />
      )}
    />
  );
};

