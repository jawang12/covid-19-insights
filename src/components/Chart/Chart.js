import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line } from 'react-chartjs-2';

import { Grid, makeStyles } from '@material-ui/core';
import { numberWithCommas } from '../../utils/numberWithCommas';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '80%'
  }
});

const Chart = () => {
  const [dailyData, setDailyData] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    (async () => {
      const data = await fetchDailyData();
      console.log(data);
      setDailyData(data);
    })();
  }, []);

  const LineGraph = dailyData ? (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            label: 'Infected',
            data: dailyData.map(({ confirmed }) => confirmed.total),
            fill: '1',
            borderColor: 'transparent',
            backgroundColor: '#7e57c2b0'
          },
          {
            label: 'Deceased',
            data: dailyData.map(({ deaths }) => deaths.total),
            fill: true,
            borderColor: 'transparent',
            backgroundColor: '#f43636c9'
          }
        ]
      }}
      options={{
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const tooltipValue =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return numberWithCommas(tooltipValue);
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: (value) => numberWithCommas(value)
              }
            }
          ]
        }
      }}
    />
  ) : (
    'loading'
  );

  return (
    <Grid container classes={{ container: styles.container }}>
      {LineGraph}
    </Grid>
  );
};

export default Chart;
