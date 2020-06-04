import React from 'react';
import { Line } from 'react-chartjs-2';
import { Grid, Card, makeStyles, useMediaQuery } from '@material-ui/core';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import { Chart } from 'react-chartjs-2';
import 'chartjs-plugin-crosshair';
import GPDtoggle from '../../ButtonGroup/GPDtoggle';

Chart.Legend.prototype.afterFit = function () {
  this.height = this.height + 10;
};

const useStyles = (size, config) =>
  makeStyles((theme) => {
    const styles = {
      root: {
        height: config.heightLarge,
        [theme.breakpoints.down(theme.breakpoints.width('tablet'))]: {
          height: config.heightSmall
        },
        position: 'relative',
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

const LineGraph = ({ country, dailyData, size, config, toggle, tState }) => {
  const classes = useStyles(size, config)();
  // address bug where zero line on y axis would protrude into graph
  const zeroLineDash = useMediaQuery('(max-width: 496px)');

  /* M-UI breakpoints.down() does not work on custom breakpoint keys. will send pull request
  const tabletOrSmaller = useMediaQuery('(max-width: 768px)'); 

  console.log(theme.breakpoints.width('tablet')) returns 768; */

  console.log(dailyData);

  return (
    <Grid item component={Card} xs={12} md={size} className={classes.root}>
      {config.filter && <GPDtoggle tState={tState} toggle={toggle} />}
      <Line
        data={{
          datasets: [
            dailyData.confirmed,
            dailyData.recovered,
            dailyData.deceased
          ]
        }}
        options={{
          title: {
            display: true,
            text: `${country} - ${config.title}`,
            fontSize: 14,
            padding: 5
          },
          tooltips: {
            mode: 'interpolate',
            intersect: false,
            callbacks: {
              label: (tooltipItem, data) => {
                const label = data.datasets[tooltipItem.datasetIndex].label;
                return ` ${label}: ${numberWithCommas(
                  tooltipItem.yLabel.toFixed(0)
                )}`;
              },
              title: (tooltipItem) => {
                const title = tooltipItem[0].xLabel;
                return `${new Date(title).toDateString()}`;
              }
            },
            bodyAlign: 'left',
            titleAlign: 'center',
            titleFontSize: 16,
            titleMarginBottom: 8,
            bodyFontSize: 14,
            xPadding: 10,
            yPadding: 10
          },
          layout: {
            padding: {
              top: config.filter ? 40 : 30,
              right: 10 //15
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  callback: (value) => numberWithCommas(value)
                },
                gridLines: {
                  borderDash: [8, 3],
                  zeroLineWidth: 1.5,
                  zeroLineColor: 'rgba(0, 0, 0, 0.3)'
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  borderDash: [8, 3],
                  // zeroLineWidth: zeroLineDash ? 1 : 1.5,
                  zeroLineColor: 'rgba(0, 0, 0, 0.1)',

                  zeroLineBorderDash: zeroLineDash ? [8, 3] : false
                },
                type: 'time',
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: config.maxTicksLimit,
                  minRotation: 25
                }
              }
            ]
          },
          hover: {
            onHover: (event, chartElement) => {
              event.target.style.cursor = chartElement[0]
                ? 'pointer'
                : 'default';
            }
          },
          legend: {
            onHover: (event) => {
              event.target.style.cursor = 'pointer';
            }
          },
          plugins: {
            crosshair: {
              sync: {
                enabled: false // enable trace line syncing with other charts
              },
              zoom: {
                enabled: false
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    </Grid>
  );
};

export default LineGraph;
