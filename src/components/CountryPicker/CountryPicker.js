import React, { useEffect, useState } from 'react';
import { Select, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import { fetchCountryNames } from '../../api';

const useStyles = makeStyles((theme) => ({
  select: {
    cursor: 'default'
  },
  formControl: {
    minWidth: '20%',
    margin: '35px 0',
    [theme.breakpoints.down('xs')]: {
      width: '45%'
    }
  }
}));

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

export default CountryPicker;
