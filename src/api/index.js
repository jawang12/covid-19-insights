import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
  try {
    let {
      data: { confirmed, deaths, recovered, lastUpdate }
    } = await axios.get(url);

    lastUpdate = `
    ${new Date(lastUpdate).toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })} ${new Date(lastUpdate).toLocaleTimeString([], {
      timeZoneName: 'short',
      hour: 'numeric',
      minute: '2-digit'
    })}
  `;
    return { confirmed, deaths, recovered, lastUpdate };
  } catch (err) {
    console.error(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
