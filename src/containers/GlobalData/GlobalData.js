import React, { useEffect, useState } from 'react';

import { Cards, CountryPicker, Chart } from '../../components';
import { fetchData, fetchDailyReports } from '../../api';
import { makeStyles } from '@material-ui/core';
import { orderByCountry } from '../../utils/orderByCountry';

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
  const [data, setData] = useState({
    dailyReports: [],
    card: {},
    countryListData: {}
  });
  const [country, setCountry] = useState('');
  const styles = useStyles();

  useEffect(() => {
    (async function () {
      const reports = await fetchDailyReports();
      const dailyReports = orderByCountry(reports);
      console.log(dailyReports, 'daily reports');
      setData({
        dailyReports: dailyReports.Global,
        card: dailyReports.Global[dailyReports.Global.length - 1],
        countryListData: dailyReports
      });
    })();
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
  };

  return (
    <div className={styles.root}>
      <Cards quantity={3} data={data.card} />
      <CountryPicker
        countryListData={data.countryListData}
        handleCountryChange={handleCountryChange}
      />
      <Chart
        country={country}
        data={data.dailyReports}
        size="full"
        type="line"
      />
    </div>
  );
};

export default GlobalData;
