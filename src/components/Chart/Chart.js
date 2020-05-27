import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, HorizontalBar } from 'react-chartjs-2';

import { Grid, Card, makeStyles } from '@material-ui/core';
import { numberWithCommas } from '../../utils/numberWithCommas';
import { Chart } from 'react-chartjs-2';
import 'chartjs-plugin-crosshair';

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
  /* M-UI breakpoints.down() does not work on custom breakpoint keys. will send pull request
  const tabletOrSmaller = useMediaQuery('(max-width: 770px)'); 

  console.log(theme.breakpoints.width('tablet')) returns 770; */

  useEffect(() => {
    (async () => {
      const data = await fetchDailyData();
      setDailyData({
        confirmed: generateLGDataset(data, 'Infected', '#7e57c2b0'),
        deceased: generateLGDataset(data, 'Deceased', 'rgba(244, 54, 54, .69)')
      });
    })();
  }, []);

  function generateLGDataset(data, label, color) {
    const dataArray = data.map(({ deaths, confirmed, reportDate }) => ({
      x: new Date(reportDate),
      y: label === 'Infected' ? confirmed.total : deaths.total
    }));

    const dataset = {
      backgroundColor: color,
      borderColor: color,
      label: label,
      data: dataArray,
      fill: false, //1
      pointRadius: 0,
      lineTension: 0,
      interpolate: true
    };
    return dataset;
  }

  const LineGraph = dailyData ? (
    <Grid
      item
      component={Card}
      xs={12}
      md={10}
      lg={8}
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
              top: 30
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: (value) => numberWithCommas(value)
                },
                gridLines: {
                  borderDash: [10, 10]
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  borderDash: [10, 10]
                },
                type: 'time',
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 15
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
          type="horizontalBar"
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

/*
<Line
data={{
  labels: dailyData.map(({ reportDate }) => reportDate),
  datasets: [
    {
      label: 'Infected',
      data: dailyData.map(({ confirmed }) => confirmed.total), 
        data: dailyData.map(({ reportDate, deaths }) => ({
                x: reportDate,
                y: deaths.total
              })),
      fill: false, //1
      borderColor: '#7e57c2b0',
      backgroundColor: '#7e57c2b0',
      pointRadius: 2,
      showLine: true,
      lineTension: 0,
      interpolate: true
    },
    {
      label: 'Deceased',
      data: dailyData.map(({ deaths }) => deaths.total),
      fill: false, //true
      borderColor: 'rgba(244, 54, 54, .69)',
      backgroundColor: 'rgba(244, 54, 54, .69)',
      pointRadius: 2,
      showLine: true,
      lineTension: 0,
      interpolate: true
    }
  ]
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
        const tooltipValue =
          data.datasets[tooltipItem.datasetIndex].data[
            tooltipItem.index
          ];
        const label = data.datasets[tooltipItem.datasetIndex].label;
        return `Confirmed ${label}: ${numberWithCommas(tooltipValue)}`;
      },
      title: (tooltipItem) => {
        const title = tooltipItem[0].label;
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
      top: 30
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: (value) => numberWithCommas(value)
        }
        // gridLines: {
        //   borderDash: [10, 10]
        // }
      }
    ],
    xAxes: [
      {
        // gridLines: {
        //   display: false
        // },
        type: 'time',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20
        }
      }
    ]
  },
  // hover: {
  //   onHover: (event, chartElement) => {
  //     event.target.style.cursor = chartElement[0]
  //       ? 'pointer'
  //       : 'default';
  //   }
  // },
  // legend: {
  //   onHover: (event) => {
  //     event.target.style.cursor = 'pointer';
  //   }
  // },
  plugins: {
    crosshair: {
      sync: {
        enabled: false, // enable trace line syncing with other charts
        suppressTooltips: false
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false
}}
/> */
