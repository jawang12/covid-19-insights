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
      setDailyData(data);
    })();
  }, []);

  const LineGraph = dailyData ? (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) =>
          new Date(reportDate).toLocaleDateString()
        ),
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
              const label = data.datasets[tooltipItem.datasetIndex].label;
              return `Confirmed ${label}: ${numberWithCommas(tooltipValue)}`;
              // return label;
            },
            title: (tooltipItem) => {
              const title = tooltipItem[0].label;
              return `${new Date(title).toDateString()}`;
            }
          },
          bodyAlign: 'center',
          titleAlign: 'center'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: (value) => numberWithCommas(value)
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
          }
        },
        legend: {
          onHover: (event) => {
            event.target.style.cursor = 'pointer';
          }
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
