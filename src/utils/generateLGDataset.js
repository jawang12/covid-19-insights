export const generateLGDataset = (data, label, color, options) => {
  const dataArray = data.map(({ updatedDate, ...dailyInfo }) => ({
    x: new Date(updatedDate.slice(5) + '-2020'),
    y:
      label === 'Infected'
        ? dailyInfo[options.a]
        : label === 'Recovered'
        ? dailyInfo[options.b]
        : dailyInfo[options.c]
  }));

  const dataset = {
    backgroundColor: color,
    borderColor: color,
    label: label,
    data: dataArray,
    fill:
      options.a === 'confirmedGrowth'
        ? false
        : label === 'Infected'
        ? 1
        : label === 'Recovered'
        ? 2
        : true,
    lineTension: 0,
    borderWidth: options.a === 'confirmedGrowth' ? 2 : 4,
    // pointRadius: [...new Array(128).fill(0), 3],
    pointRadius: 0,
    // pointBorderWidth: 3,
    // pointHitRadius: 6,
    interpolate: true
  };
  return dataset;
};
