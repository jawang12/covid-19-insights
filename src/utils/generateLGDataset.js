export const generateLGDataset = (data, label, color) => {
  const dataArray = data.map(({ deaths, confirmed, reportDate }) => ({
    x: new Date(reportDate.slice(5) + '-2020'),
    y: label === 'Infected' ? confirmed.total : deaths.total
  }));

  const dataset = {
    backgroundColor: color,
    borderColor: color,
    label: label,
    data: dataArray,
    fill: label === 'Infected' ? 1 : true,
    lineTension: 0,
    borderWidth: 4,
    // pointRadius: [...new Array(128).fill(0), 3],
    pointRadius: 0,
    // pointBorderWidth: 3,
    // pointHitRadius: 6,
    interpolate: true
  };
  return dataset;
};
