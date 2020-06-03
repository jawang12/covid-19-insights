import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Card, makeStyles } from '@material-ui/core';
import { numberWithCommas } from '../../../utils/numberWithCommas';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '400px',
    [theme.breakpoints.down(theme.breakpoints.width('tablet'))]: {
      height: '360px'
    },
    padding: '0 16px 22px 16px',
    boxShadow:
      '0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15)'
  }
}));

const BarGraph = ({
  country,
  size,
  totalData: { confirmed, deaths, recovered }
}) => {
  const classes = useStyles();
  return (
    <Grid
      item
      component={Card}
      xs={12}
      md={size === 'full' ? 10 : 5}
      className={classes.root}
    >
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deceased'],
          datasets: [
            {
              label: 'People',
              backgroundColor: [
                'rgba(126, 87, 194, .69)',
                'rgba(23, 247, 23, .52)',
                'rgba(244, 54, 54, .59)'
              ],
              borderWidth: 1.5,
              hoverBackgroundColor: [
                'rgba(126, 87, 194, .8)',
                'rgba(23, 247, 23, .65)',
                'rgba(244, 54, 54, .69)'
              ],
              hoverBorderColor: [
                'rgba(126, 87, 194, 1)',
                'rgba(30, 202, 30, .8)',
                'rgba(244, 54, 54, .8)'
              ],
              data: [confirmed, recovered, deaths]
            }
          ]
        }}
        options={{
          legend: {
            display: false
          },
          title: {
            display: true,
            padding: 10,
            fontSize: 14,
            text: country + ' - Total'
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: (value) => numberWithCommas(value)
                }
              }
            ]
          },
          tooltips: {
            bodyAlign: 'center',
            titleAlign: 'center',
            titleFontSize: 16,
            titleMarginBottom: 8,
            bodyFontSize: 14,
            xPadding: 10,
            yPadding: 10,
            callbacks: {
              label: (tooltipItem, data) => {
                const label = data.datasets[tooltipItem.datasetIndex].label;
                return `Confirmed ${label}: ${numberWithCommas(
                  tooltipItem.value
                )}`;
              }
            }
          },
          plugins: {
            crosshair: false
          },
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </Grid>
  );
};

export default BarGraph;
