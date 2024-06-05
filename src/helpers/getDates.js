import { convertMonthToNumber } from "./convertMonthToNumber";
import { convertMonthToString } from "./convertMonthToString";
import { getCurrentDate } from "./getCurrentDate";

export const getOptions = (transactions) => {
  const transactionDates = transactions.map(
    (transaction) => transaction.transactionDate
  );
  const transactionYears = transactionDates.map((transaction) => {
    const year = transaction.slice(0, 4);
    return { label: year, value: year };
  });
  const transactionMonths = transactionDates.map((transaction) => {
    const monthNumeric = transaction.slice(5, 7);
    return convertMonthToString(monthNumeric);
  });
  const unsortedMonthsOptions = transactionMonths.map((month) => {
    return convertMonthToNumber(month.value);
  });
  const sortedNumMonthsOptions = unsortedMonthsOptions.toSorted((a, b) => {
    return a - b;
  });
  const sortedMonthsOptions = sortedNumMonthsOptions.map((month) => {
    return convertMonthToString(month);
  });
  const sortedYearsOptions = transactionYears.toSorted((a, b) => {
    return b.value - a.value;
  });

  const yearsOptions = [...sortedYearsOptions];
  const monthsOptions = [...sortedMonthsOptions];

  const filteredYearsOptions = yearsOptions.filter((year, index, self) => {
    return (
      index ===
      self.findIndex((currentYear) => currentYear.value === year.value)
    );
  });
  const filteredMonthsOptions = monthsOptions.filter((month, index, self) => {
    return (
      index ===
      self.findIndex((currentMonth) => currentMonth.value === month.value)
    );
  });

  return { filteredMonthsOptions, filteredYearsOptions };
};

export const getOptionsIndex = (
  filteredMonthsOptions,
  filteredYearsOptions
) => {
  const { currentMonth, currentYear } = getCurrentDate();

  const monthIndex = filteredMonthsOptions.findIndex((month) => {
    return convertMonthToNumber(month.value) === currentMonth;
  });
  const yearIndex = filteredYearsOptions.findIndex((year) => {
    return year.value === currentYear;
  });

  return { monthIndex, yearIndex };
};
