import React, { useEffect } from 'react';
import parse from 'autosuggest-highlight/parse';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Grid, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import throttle from 'lodash.throttle';
import { googleMapsKey } from '../config';
import { useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: 'fit-content',
    backgroundColor: 'white',
    position: 'relative',
    top: '-24px',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function loadScript(src: string, id: string, position: HTMLHeadElement | null) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

interface SearchBarProps {
  onSearch: ({ lat, lng }: any) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<any>({});
  const [inputValue, setInputValue] = React.useState<string | null>(null);
  const [options, setOptions] = React.useState<any[]>([]);
  const loaded = React.useRef<boolean>(false);
  const autocompleteService = useRef<any>();
  const placesService = useRef<any>();

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`,
        'google-maps',
        document.querySelector('head'),
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    if (value?.place_id) {
      placesService.current.geocode({ placeId: value.place_id }).then((res: any) => {
        const pos = res.results?.[0]?.geometry?.location;
        const lat = pos?.lat();
        const lng = pos?.lng();

        if (lat && lng) {
          onSearch({ lat, lng });
        }
      });
    }
  }, [value, onSearch]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!placesService.current && (window as any).google) {
      placesService.current = new (window as any).google.maps.Geocoder();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results: any) => {
      if (active) {
        let newOptions: string[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      style={{ width: 400 }}
      getOptionLabel={(option) => (typeof option.description === 'string' && option.description) || ''}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(_event, newValue: any) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(_event, newInputValue: string | null) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Where are you going?" variant="outlined" fullWidth />}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part: any, index: number) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};
