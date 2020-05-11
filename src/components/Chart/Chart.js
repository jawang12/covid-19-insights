import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';

const Chart = (props) => {
  const [dailyData, setDailyData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchDailyData();
      console.log(data);
      setDailyData(data);
    })();
  }, []);

  return <div>{dailyData && dailyData[0].totalConfirmed}</div>;
};

export default Chart;
