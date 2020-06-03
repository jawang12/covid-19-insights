import React from 'react';
import { generateLGDataset } from '../../utils/generateLGDataset';
import LineGraph from './LineGraph/LineGraph';
import BarGraph from './BarGraph/BarGraph';

const DataChart = ({ type, size, data }) => {
  let chartData;
  let country;
  if (data.length) {
    if (type === 'line') {
      chartData = {
        confirmed: generateLGDataset(data, 'Infected', '#7e57c2b0'),
        recovered: generateLGDataset(data, 'Recovered', '#17f71785'),
        deceased: generateLGDataset(data, 'Deceased', 'rgba(244, 54, 54, .69)')
      };
    } else {
      chartData = { ...data[data.length - 1] };
    }
    country = data[0].country;
  }

  const graph =
    type === 'line'
      ? (chartData && (
          <LineGraph dailyData={chartData} size={size} country={country} />
        )) ||
        'LOADDDD'
      : (chartData && (
          <BarGraph totalData={chartData} country={country} size={size} />
        )) ||
        'loading';

  return graph;
};

export default DataChart;
