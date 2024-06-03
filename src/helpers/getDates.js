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

export const getOptionsIndex = (
  filteredMonthsOptions,
  filteredYearsOptions
) => {
  const date = new Date();
  const currentMonth = format(date, "MM");
  console.log(currentMonth);
  const currentYear = format(date, "yyyy");

  const getNumericMonth = (month) => {
    switch (month) {
      case "January":
        return "01";
      case "February":
        return "02";
      case "March":
        return "03";
      case "April":
        return "04";
      case "May":
        return "05";
      case "June":
        return "06";
      case "July":
        return "07";
      case "August":
        return "08";
      case "September":
        return "09";
      case "October":
        return "10";
      case "November":
        return "11";
      case "December":
        return "12";

      default:
    }
  };

  const monthIndex = filteredMonthsOptions.findIndex((month) => {
    return getNumericMonth(month.label) === currentMonth;
  });
  const yearIndex = filteredYearsOptions.findIndex((year) => {
    return year.value === currentYear;
  });

  return { monthIndex, yearIndex };
};
