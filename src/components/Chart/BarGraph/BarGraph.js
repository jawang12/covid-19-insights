import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Card, makeStyles } from '@material-ui/core';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import 'chartjs-plugin-deferred';

const useStyles = (size) =>
  makeStyles((theme) => {
    const styles = {
      root: {
        height: '430px',
        [theme.breakpoints.down(theme.breakpoints.width('tablet'))]: {
          height: '370px'
        },
        padding: '0 16px 22px 16px',
        boxShadow:
          '0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15)'
      }
    };
    if (size < 10) {
      styles.root[theme.breakpoints.up('md')] = {
        flexBasis: '40.666667%'
      };
      styles.root[theme.breakpoints.only('sm')] = {
        flexBasis: '49%'
      };
    }
    return styles;
  });

const BarGraph = ({
  country,
  size,
  totalData: { confirmed, deaths, recovered }
}) => {
  const classes = useStyles(size)();
  return (
    <Grid
      item
      component={Card}
      xs={12}
      sm={6}
      md={size}
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
            padding: 5,
            fontSize: 14,
            text: country + ' - Total'
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  // display: false,
                  borderDash: [8, 3]
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: (value) => numberWithCommas(value)
                },
                gridLines: {
                  borderDash: [8, 3]
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
          layout: {
            padding: {
              top: 30
            }
          },
          plugins: {
            crosshair: false,
            deferred: {
              yOffset: '60%',
              delay: 300
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </Grid>
  );
};

export default BarGraph;
