import React, { useEffect, useState } from 'react';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { fetchCountryNames } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async function () {
      const countriesFromAPI = await fetchCountryNames();
      setCountries(countriesFromAPI);
    })();
  }, []);

  return (
    <FormControl variant="outlined" style={{ minWidth: '200px' }}>
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        defaultValue=""
        labelId="country-label"
        label="Country"
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        {countries.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryPicker;
