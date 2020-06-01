import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { countryToFlag } from '../../utils/countryToFlag';
import { sanitizeCountryCode } from '../../utils/sanitizeCountryCode';

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

const CountryPicker = ({ countryListData, handleCountryChange }) => {
  const classes = useStyles();
  const countryList = [];

  if (countryListData.Global) {
    for (let country in countryListData) {
      countryList.push({
        country: countryListData[country][0].country,
        countryCode: sanitizeCountryCode(
          countryListData[country][0].countryCode
        )
      });
    }
    countryList.sort((a, b) => (a.country > b.country ? 1 : -1));
  }
  console.log('countryList', countryList);
  return (
    <Autocomplete
      id="country-picker"
      options={countryList}
      classes={{ option: classes.option, root: classes.autoComplete }}
      autoHighlight
      autoComplete
      includeInputInList
      onChange={(e, newValue) => {
        if (!newValue) return;
        handleCountryChange(newValue.country);
      }}
      getOptionLabel={(option) => option.country}
      renderOption={(option) => (
        <>
          <span>{countryToFlag(option.countryCode)}</span> {`${option.country}`}
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
