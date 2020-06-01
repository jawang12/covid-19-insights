import React from 'react';
import { Grid } from '@material-ui/core';
import { generateLGDataset } from '../../utils/generateLGDataset';
import LineGraph from './LineGraph/LineGraph';
import BarGraph from './Bar/Bar';

const DataChart = ({ country, type, size, data }) => {
  // const [dailyData, setDailyData] = useState(null);
  let dailyData = null;
  // useEffect(() => {
  if (data.length > 1) {
    dailyData = {
      confirmed: generateLGDataset(data, 'Infected', '#7e57c2b0'),
      recovered: generateLGDataset(data, 'Recovered', '#17f71785'),
      deceased: generateLGDataset(data, 'Deceased', 'rgba(244, 54, 54, .69)')
    };
  }
  // }, [data]);

  const graph =
    type === 'line'
      ? (dailyData && (
          <LineGraph dailyData={dailyData} size={size} country={country} />
        )) ||
        'LOADDDD'
      : (dailyData && <BarGraph />) || 'loading';

  return (
    <Grid container justify="center">
      {graph}
    </Grid>
  );
};

export default DataChart;
