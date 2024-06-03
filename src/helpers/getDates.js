import { format } from "date-fns";

export const getOptions = (transactions) => {
  const transactionDates = transactions.map(
    (transaction) => transaction.transactionDate
  );
  const transactionYears = transactionDates.map((transaction) => {
    const year = transaction.slice(0, 4);
    return { label: year, value: year };
  });
  const transactionMonths = transactionDates.map((transaction) => {
    const monthNumerical = transaction.slice(5, 7);

    switch (monthNumerical) {
      case "01":
        return { label: "January", value: "january" };
      case "02":
        return { label: "February", value: "february" };
      case "03":
        return { label: "March", value: "march" };
      case "04":
        return { label: "April", value: "april" };
      case "05":
        return { label: "May", value: "may" };
      case "06":
        return { label: "June", value: "june" };
      case "07":
        return { label: "July", value: "july" };
      case "08":
        return { label: "August", value: "august" };
      case "09":
        return { label: "September", value: "september" };
      case "10":
        return { label: "October", value: "october" };
      case "11":
        return { label: "November", value: "november" };
      case "12":
        return { label: "December", value: "december" };

      default:
    }
  });

  const yearsOptions = [...transactionYears];
  const monthsOptions = [...transactionMonths];

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

export const getNumericMonth = (month) => {
  switch (month) {
    case "january":
      return "01";
    case "february":
      return "02";
    case "march":
      return "03";
    case "april":
      return "04";
    case "may":
      return "05";
    case "june":
      return "06";
    case "july":
      return "07";
    case "august":
      return "08";
    case "september":
      return "09";
    case "october":
      return "10";
    case "november":
      return "11";
    case "december":
      return "12";

    default:
  }
};

export const getCurrentDate = () => {
  const date = new Date();
  const currentMonth = format(date, "MM");
  const currentYear = format(date, "yyyy");

  return { currentMonth, currentYear };
};

export const getOptionsIndex = (
  filteredMonthsOptions,
  filteredYearsOptions
) => {
  const { currentMonth, currentYear } = getCurrentDate();

  const monthIndex = filteredMonthsOptions.findIndex((month) => {
    return getNumericMonth(month.value) === currentMonth;
  });
  const yearIndex = filteredYearsOptions.findIndex((year) => {
    return year.value === currentYear;
  });

  return { monthIndex, yearIndex };
};
