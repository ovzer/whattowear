import { InputAdornment, TextField, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDebounce } from '../functions/useDebounce';
import { getAutocompleteSuggestions, IAutocompleteSuggestion } from '../functions/getAutocompleteSuggestions';
import { getReverseGeocode } from '../functions/getReverseGeocode';
import { getCoordinates } from '../functions/getCoordinates';

interface ILocationProps {
  setLocation: Function;
  location: IAutocompleteSuggestion | null;
}

const boldTag = '#';

export const Location: React.FC<ILocationProps> = (props) => {
  const { setLocation, location } = props;
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>();
  const [searchString, setSearchString] = useState<string | null>(null);
  const debouncedSearchString = useDebounce(searchString, 500);
  const [options, setOptions] = useState<IAutocompleteSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const asyncGetCoordinates = async() => {
      if (location && !location.coordinates) {
        const coordinates = await getCoordinates(location);
        if (coordinates) {
          console.log(coordinates);
          setLocation((currentLocation: IAutocompleteSuggestion) => {return ({ ...currentLocation, coordinates });});
        }
      }
    };
    asyncGetCoordinates();
  }, [location, setLocation]);

  useEffect(() => {
    const getLocation = async() => {
      try {
        const resolve = (position: Position) => {
          setUserCoordinates(position.coords);
          const asyncGetReverseGeocode = async() => {
            const currentLocation = await getReverseGeocode(position.coords);
            if (currentLocation !== null) {
              setLocation(currentLocation);
            }
          };
          asyncGetReverseGeocode();
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
  }, [setLocation]);

  useEffect(() => {
    if (debouncedSearchString === null || debouncedSearchString === '') {
      setOptions([]);
    } else {
      const asyncAutocompleteSuggestions = async() => {
        setLoading(true);
        const autocompleteSuggestions = await getAutocompleteSuggestions(debouncedSearchString, userCoordinates, boldTag);
        setOptions(autocompleteSuggestions);
        setLoading(false);
      };
      asyncAutocompleteSuggestions();
    }
  }, [debouncedSearchString, userCoordinates]);

  const onSelect = (event: React.ChangeEvent<{}>, value: IAutocompleteSuggestion | null) => {
    if (value !== null) {
      setLocation(value);
    } else {
      setLocation(null);
    }
  };

  const onType = (event: React.ChangeEvent<{}>, value: string, reason: string) => {
    if (value !== null && reason === 'input') {
      setSearchString(value);
    } else {
      setSearchString(null);
    }
  };

  const Boldify: React.FC<{string: string}> = (props) => {
    const { string } = props;
    const parts = string.split(boldTag);

    return (
      <>
        {parts.map((part, index) => (
          <span key={index} style={{ fontWeight: index % 2 ? 700 : 300 }}>
            {part}
          </span>
        ))}
      </>
    );
  };

  return (
    <Autocomplete
      value={location}
      options={options}
      multiple={false}
      loading={loading}
      includeInputInList
      filterOptions={(x) => x}
      onChange={onSelect}
      onInputChange={onType}
      noOptionsText=""
      popupIcon={null}
      disableClearable
      disableOpenOnFocus
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          variant="standard"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      getOptionLabel={(option: IAutocompleteSuggestion) => (option.locationName && option.locationName.replace(new RegExp(boldTag, 'g'), '')) || ''}
      renderOption={(option) => {
        return (
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="body1">
                <Boldify string={option.locationName} />
              </Typography>
              {option.secondaryText && (
                <Typography variant="caption" color="textSecondary">
                  <Boldify string={option.secondaryText} />
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

