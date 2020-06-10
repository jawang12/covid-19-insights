import React, { useEffect, useState, useCallback } from 'react';

import { Cards, CountryPicker, Chart, Title } from '../../components';
import { fetchDailyReports } from '../../api';
import { makeStyles, Grid } from '@material-ui/core';
import { orderByCountry } from '../../utils/orderByCountry';
import { graphConfig } from './utils/graph-config';

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
  },
  container: {
    marginTop: 25
  },
  divider: {
    flexBasis: '2%',
    [theme.breakpoints.down('sm')]: {
      height: '25px'
    }
  }
}));

const GlobalData = () => {
  const [data, setData] = useState({
    dailyReports: {},
    currentDailyReport: [],
    filter: ''
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
        filter: 'total'
      });
    })();
  }, []);

  const handleCountryChange = useCallback((country) => {
    setData((previousData) => ({
      ...previousData,
      currentDailyReport: previousData.dailyReports[country]
    }));
  }, []);

  const handleToggle = (value) =>
    setData((previousData) => ({
      ...previousData,
      filter: value
    }));

  const dailyReportsOptions = {
    a: 'confirmed',
    b: 'recovered',
    c: 'deaths',
    filter: data.filter
  };

  const dailyGrowthOptions = {
    a: 'confirmedGrowth',
    b: 'recoveredGrowth',
    c: 'deathsGrowth',
    filter: data.filter
  };

  const dailyGrowthConfig = graphConfig(
    '570px',
    '470px',
    'Growth Per Day',
    18,
    true
  );
  const dailyReportsConfig = graphConfig('430px', '370px', 'Daily (AGG)', 10);

  return (
    <div className={styles.root}>
      <Title name="Daily Reports" dailyReport={data.currentDailyReport} />
      <Cards quantity={3} data={data.currentDailyReport.slice(-30)} />
      <CountryPicker
        countryListData={data.dailyReports}
        handleCountryChange={handleCountryChange}
      />
      <Grid
        container
        justify="center"
        classes={{ container: styles.container }}
      >
        <Chart
          data={data.currentDailyReport}
          size={10}
          type="line"
          options={dailyGrowthOptions}
          config={dailyGrowthConfig}
          toggle={handleToggle}
        />
      </Grid>
      <Grid container justify="center" className={styles.container}>
        <Chart data={data.currentDailyReport} size={5} type="bar" />
        <div className={styles.divider}></div>
        <Chart
          data={data.currentDailyReport}
          size={5}
          type="line"
          options={dailyReportsOptions}
          config={dailyReportsConfig}
        />
      </Grid>
    </div>
  );
};

export default GlobalData;
