export const orderByCountry = (arr) => {
  const countriesObj = arr.reduce(
    (dailyReport, current) => {
      if (!current.errorStatus) {
        current.country = 'Global';
        dailyReport.Global.push(current);

        current.countries.forEach((country) => {
          country.updatedDate = current.updatedDate;
          dailyReport[country.countryCode]
            ? dailyReport[country.countryCode].push(country)
            : (dailyReport[country.countryCode] = [country]);
        });
      }
      return dailyReport;
    },
    { Global: [] }
  );
  return sanitizeCountries(countriesObj);
};

function sanitizeCountries(dailyReports) {
  const sanitizedReports = {};

  for (let country in dailyReports) {
    if (
      dailyReports[country].length > 49 ||
      country === 'KM' ||
      country === 'LS' ||
      country === 'TJ'
    ) {
      sanitizedReports[country] = dailyReports[country];
    }
  }
  return sanitizedReports;
}
