import axios from 'axios';
import { orderByCountry } from '../utils/orderByCountry';

const wrapPromise = (promise) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else {
        return result;
      }
    }
  };
};

const dailyReportsPromise = () => {
  return axios
    .get(
      'https://raw.githubusercontent.com/jawang12/covid-data-ext/master/data/data.json'
    )
    .then((result) => {
      const dailyReports = orderByCountry(result.data.dailyReports);
      return {
        dailyReports,
        currentDailyReport: dailyReports.Global,
        filter: 'total'
      };
    });
};

export const suspenseFetchDailyReports = () => {
  return {
    reports: wrapPromise(dailyReportsPromise())
  };
};
