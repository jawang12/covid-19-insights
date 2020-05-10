import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
  try {
    let {
      data: { confirmed, deaths, recovered, lastUpdate }
    } = await axios.get(url);

    lastUpdate = `
    ${new Date(lastUpdate).toLocaleDateString()} ${new Date(
      lastUpdate
    ).toLocaleTimeString()}
  `;
    return { confirmed, deaths, recovered, lastUpdate };
  } catch (err) {
    console.error(err);
  }
};
