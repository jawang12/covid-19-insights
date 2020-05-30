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
    pointRadius: 0,
    lineTension: 0,
    interpolate: true
  };
  return dataset;
};
