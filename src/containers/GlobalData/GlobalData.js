import React, { useEffect, useState } from 'react';

import { Cards, CountryPicker, Chart } from '../../components';
import { fetchData } from '../../api';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '0 5%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 2%'
    }
  }
}));

const GlobalData = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const styles = useStyles();

  useEffect(() => {
    (async function () {
      const data = await fetchData();
      console.log(data, 'data from mathdroid');
      setData(data);
    })();
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
  };

  return (
    <div className={styles.root}>
      <Cards quantity={3} data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart country={country} data={data} />
    </div>
  );
};

export default GlobalData;
