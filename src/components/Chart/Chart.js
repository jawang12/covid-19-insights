import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, HorizontalBar } from 'react-chartjs-2';

import { Grid, useMediaQuery } from '@material-ui/core';
import { numberWithCommas } from '../../utils/numberWithCommas';
import { Chart } from 'react-chartjs-2';

Chart.Legend.prototype.afterFit = function () {
  this.height = this.height + 10;
};

const DataChart = ({ country, data: { confirmed, deaths, recovered } }) => {
  const [dailyData, setDailyData] = useState(null);
  //M-UI breakpoints.down() does not work on custom breakpoints. will send pull request
  const tabletOrSmaller = useMediaQuery('(max-width: 770px)');

  // console.log(tabletOrSmaller, theme.breakpoints.width('tablet'));

  useEffect(() => {
    (async () => {
      const data = await fetchDailyData();
      setDailyData(data);
    })();
  }, []);

  console.log('render');

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
            backgroundColor: 'rgba(244, 54, 54, .69)'
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
            },
            title: (tooltipItem) => {
              const title = tooltipItem[0].label;
              return `${new Date(title).toDateString()}`;
            }
          },
          bodyAlign: 'center',
          titleAlign: 'center',
          titleFontSize: 16,
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

  const HBarGraph =
    country && country !== 'Global' ? (
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
            text: 'Current state of ' + country
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          }
        }}
      />
    ) : null;

  return (
    <Grid container style={{ width: tabletOrSmaller ? '100%' : '80%' }}>
      {HBarGraph || LineGraph}
    </Grid>
  );
};

export default DataChart;
