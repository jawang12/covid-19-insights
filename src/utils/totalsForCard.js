export const totalsForCard = (arr) =>
  arr.reduce(
    (numbers, dailyReport, i, array) => {
      if (i > array.length - 8) {
        numbers.iWeekTotal += dailyReport.confirmedGrowth;
        numbers.rWeekTotal += dailyReport.recoveredGrowth;
        numbers.dWeekTotal += dailyReport.deathsGrowth;
      }
      numbers.iMonthTotal += dailyReport.confirmedGrowth;
      numbers.rMonthTotal += dailyReport.recoveredGrowth;
      numbers.dMonthTotal += dailyReport.deathsGrowth;

      return numbers;
    },
    {
      iMonthTotal: 0,
      iWeekTotal: 0,
      rMonthTotal: 0,
      rWeekTotal: 0,
      dMonthTotal: 0,
      dWeekTotal: 0
    }
  );
