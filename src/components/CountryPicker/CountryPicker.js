import React, { useEffect, useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchCountryNames } from '../../api';
import { countryToFlag } from '../../utils/countryToFlag';

const useStyles = makeStyles((theme) => ({
  autoComplete: {
    minWidth: '20%',
    width: 250,
    margin: '35px 0',
    [theme.breakpoints.down('xs')]: {
      width: '45%'
    }
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
}));

const CountryPicker = ({ handleCountryChange }) => {
  const classes = useStyles();
  const [countries, setCountries] = useState([{ name: 'Global' }]);

  useEffect(() => {
    (async function () {
      const countriesFromAPI = await fetchCountryNames();
      console.log(countriesFromAPI.length);
      setCountries((countries) => countries.concat(countriesFromAPI));
    })();
  }, []);

  return (
    <Autocomplete
      id="country-picker"
      options={countries}
      classes={{ option: classes.option, root: classes.autoComplete }}
      autoHighlight
      autoComplete
      includeInputInList
      onChange={(e, newValue) => {
        if (!newValue) return;
        handleCountryChange(newValue.name);
      }}
      getOptionLabel={(option) =>
        option.name === 'US' ? 'United States' : option.name
      }
      renderOption={(option) => (
        <>
          <span>{countryToFlag(option.iso2)}</span>{' '}
          {`${option.name === 'US' ? 'United States' : option.name}`}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password'
          }}
        />
      )}
    />
  );
};

export default CountryPicker;

/*
const CountryPicker = ({ handleCountryChange }) => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async function () {
      const countriesFromAPI = await fetchCountryNames();
      setCountries(countriesFromAPI);
    })();
  }, []);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="country-label">Country</InputLabel>
      <Select
        native
        label="Country"
        defaultValue=""
        classes={{ select: classes.select }}
        id="country-label"
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="Global">Global</option>
        {countries.map(({ name }) => (
          <option key={name} style={{ cursor: 'grab' }} value={name}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
*/
