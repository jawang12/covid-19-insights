import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, HorizontalBar } from 'react-chartjs-2';
import { Grid, Card, makeStyles, useMediaQuery } from '@material-ui/core';
import { numberWithCommas } from '../../utils/numberWithCommas';
import { Chart } from 'react-chartjs-2';
import 'chartjs-plugin-crosshair';
import { generateLGDataset } from '../../utils/generateLGDataset';

Chart.Legend.prototype.afterFit = function () {
  this.height = this.height + 10;
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '600px',
    [theme.breakpoints.down(theme.breakpoints.width('tablet'))]: {
      height: '460px'
    }
  },
  gridItem: {
    padding: '0 16px 22px 16px',
    boxShadow:
      '0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15)'
  }
}));

const DataChart = ({ country, data: { confirmed, deaths, recovered } }) => {
  const [dailyData, setDailyData] = useState(null);
  const classes = useStyles();
  // address bug where zero line on y axis would protrude into graph
  const zeroLineDash = useMediaQuery('(max-width: 496px)');

  /* M-UI breakpoints.down() does not work on custom breakpoint keys. will send pull request
  const tabletOrSmaller = useMediaQuery('(max-width: 768px)'); 

  console.log(theme.breakpoints.width('tablet')) returns 768; */

  useEffect(() => {
    (async () => {
      const data = await fetchDailyData();
      setDailyData({
        confirmed: generateLGDataset(data, 'Infected', '#7e57c2b0'),
        deceased: generateLGDataset(data, 'Deceased', 'rgba(244, 54, 54, .69)')
      });
    })();

    fetch(
      'https://raw.githubusercontent.com/jawang12/covid-data-ext/master/data/data.json'
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const LineGraph = dailyData ? (
    <Grid
      item
      component={Card}
      xs={12}
      md={10}
      className={[classes.gridItem, classes.root].join(' ')}
    >
      <Line
        data={{
          datasets: [dailyData.confirmed, dailyData.deceased]
        }}
        options={{
          title: {
            display: true,
            text: 'Global - Daily',
            fontSize: 14,
            padding: 5
          },
          tooltips: {
            mode: 'interpolate',
            intersect: false,
            callbacks: {
              label: (tooltipItem, data) => {
                const label = data.datasets[tooltipItem.datasetIndex].label;
                return `Confirmed ${label}: ${numberWithCommas(
                  tooltipItem.yLabel.toFixed(0)
                )}`;
              },
              title: (tooltipItem) => {
                const title = tooltipItem[0].xLabel;
                return `${new Date(title).toDateString()}`;
              }
            },
            bodyAlign: 'center',
            titleAlign: 'center',
            titleFontSize: 16,
            titleMarginBottom: 8,
            bodyFontSize: 14,
            xPadding: 10,
            yPadding: 10
          },

          layout: {
            padding: {
              top: 30,
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
                  maxTicksLimit: 18,
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
  ) : (
    'loading'
  );

  const HBarGraph =
    country && country !== 'Global' ? (
      <Grid
        item
        component={Card}
        xs={12}
        md={10}
        lg={8}
        className={[classes.gridItem].join(' ')}
      >
        <HorizontalBar
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
                data: [confirmed.value, recovered.value, deaths.value]
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
              yAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
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
            }
          }}
        />
      </Grid>
    ) : null;

  return (
    <Grid container className={!HBarGraph ? classes.root : ''} justify="center">
      {HBarGraph || LineGraph}
    </Grid>
  );
};

export default DataChart;
