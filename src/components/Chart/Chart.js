import React from 'react';
import { generateLGDataset } from '../../utils/generateLGDataset';
import LineGraph from './LineGraph/LineGraph';
import BarGraph from './BarGraph/BarGraph';

const DataChart = ({ type, size, data, options, config, toggle }) => {
  let chartData;
  let country;

  // check if no longer necessary due to react suspense
  // if (data.length) {
  if (type === 'line') {
    chartData = {
      confirmed: generateLGDataset(data, 'Infected', '#7e57c2b0', options),
      recovered: generateLGDataset(data, 'Recovered', '#17f71785', options),
      deceased: generateLGDataset(
        data,
        'Deceased',
        'rgba(244, 54, 54, .69)',
        options
      )
    };
  } else {
    chartData = { ...data[data.length - 1] };
  }
  country = data[0].country;
  // }

  const graph =
    type === 'line' ? (
      <LineGraph
        dailyData={chartData}
        size={size}
        country={country}
        config={config}
        toggle={toggle}
        tState={options.filter}
      />
    ) : (
      <BarGraph totalData={chartData} country={country} size={size} />
    );

  return graph;
};

export default DataChart;
