import React, { useEffect, useState, useCallback } from 'react';

import { Cards, CountryPicker, Chart } from '../../components';
import { fetchDailyReports } from '../../api';
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
    dailyReports: {},
    currentDailyReport: [],
    card: {},
    countryListData: {}
  });
  const styles = useStyles();

  useEffect(() => {
    (async function () {
      const reports = await fetchDailyReports();
      const dailyReports = orderByCountry(reports);
      console.log(dailyReports, 'daily reports');
      setData({
        dailyReports,
        currentDailyReport: dailyReports.Global,
        card: dailyReports.Global[dailyReports.Global.length - 1],
        countryListData: dailyReports
      });
    })();
  }, []);

  const handleCountryChange = useCallback((country) => {
    setData((previousData) => ({
      ...previousData,
      card:
        previousData.dailyReports[country][
          previousData.dailyReports[country].length - 1
        ],
      currentDailyReport: previousData.dailyReports[country]
    }));
  }, []);

  return (
    <div className={styles.root}>
      <Cards quantity={3} data={data.card} />
      <CountryPicker
        countryListData={data.countryListData}
        handleCountryChange={handleCountryChange}
      />
      <Chart data={data.currentDailyReport} size="full" type="line" />
    </div>
  );
};

export default GlobalData;
