import { InputAdornment, TextField, Grid, Typography, PaperProps, Box, makeStyles, Button, Tooltip } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useNavigatorPermissions from 'react-use-navigator-permissions';

import { useDebounce } from '../functions/useDebounce';
import { getAutocompleteSuggestions, IAutocompleteSuggestion } from '../functions/getAutocompleteSuggestions';
import { getReverseGeocode } from '../functions/getReverseGeocode';
import { getCoordinates } from '../functions/getCoordinates';
import { CustomPaper } from '../uiComponents/CustomPaper';

interface ILocationProps {
  setLocation: Function;
  location: IAutocompleteSuggestion | null;
}

const boldTag = '#';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor:theme.palette.primary.dark,
    borderRadius: 0,
    boxShadow: theme.shadows[10],
  },
}));

export const Location: React.FC<ILocationProps> = (props) => {
  const { setLocation, location } = props;
  const { status, error } = useNavigatorPermissions('geolocation');
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>();
  const [searchString, setSearchString] = useState<string | null>(null);
  const debouncedSearchString = useDebounce(searchString, 500);
  const [options, setOptions] = useState<IAutocompleteSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const asyncGetCoordinates = async() => {
      if (location && !location.coordinates) {
        const coordinates = await getCoordinates(location);
        if (coordinates) {
          setLocation((currentLocation: IAutocompleteSuggestion) => {return ({ ...currentLocation, coordinates });});
        }
      }
    };
    asyncGetCoordinates();
  }, [location, setLocation]);

  const getLocation = useCallback(async() => {
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
  }, [setLocation]);

  // Get user location at page load if permission is already granted
  useEffect(() => {
    console.log({ status });
    console.log({ error });
    if (status === 'granted') {
      console.log('granteed');
      getLocation();
    }
  }, [status, getLocation, error]);

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
    <>
      {status !== 'denied' &&
        !userCoordinates &&
        (
          <Box mb={1}>
            <Button variant="outlined" onClick={getLocation}>Finn posisjonen min</Button>
          </Box>
        )}
      <Tooltip title={status === 'denied' ? 'For å hente posisjonen automatisk må du fjerne blokkeringen av posisjonsdeling i nettleseren din' : ''}>
        <Autocomplete
          classes={{ paper: classes.paper }}
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
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color={focus ? 'primary' : 'inherit'} />
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
      </Tooltip>
    </>
  );
};

