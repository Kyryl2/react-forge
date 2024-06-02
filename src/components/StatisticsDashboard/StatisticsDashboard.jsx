import Select from "react-select";
import css from "./StatisticsDashboard.module.css";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import { format } from "date-fns";

const StatisticsDashboard = () => {
  const transactions = useSelector(selectTransactions);

  const styles = {
    control: () => ({}),
    container: (baseStyles) => ({
      ...baseStyles,
      border: "1px solid rgba(255, 255, 255, 0.6)",
      borderRadius: 8,
      width: 280,
      height: 50,
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: 16,
      backgroundColor: "rgba(74, 86, 226, 0.1)",
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: 16,
      color: "#fbfbfb",
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      caretColor: "#fbfbfb",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: 16,
      color: "#fbfbfb",
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: "12px 20px",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      background:
        "linear-gradient(360deg, rgba(83, 61, 186, 0.7) 0%, rgba(80, 48, 154, 0.7) 35.94%, rgba(106, 70, 165, 0.7) 61.04%, rgba(133, 93, 175, 0.7) 100%);",
      backdropFilter: "blur(100px)",
      boxShadow: "0 4px 60px 0 rgba(0, 0, 0, 0.25)",
      borderRadius: 8,
      cursor: "pointer",
      overflow: "hidden",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      display: "flex",
      flexDirection: "column",
      height: 158,
      padding: 0,
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused && "rgba(255, 255, 255, 0.1)",
      color: state.isFocused ? "#ff868d" : "#fbfbfb",
      cursor: "pointer",
      padding: "8px 20px",
      display: "block",
      ":active": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    }),
  };

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

  const date = new Date();
  const currentMonth = format(date, "MM");
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

  return (
    <>
      <div className={css.wrapper}>
        <Select
          className={css.select}
          options={filteredMonthsOptions}
          defaultValue={filteredMonthsOptions[monthIndex]}
          styles={styles}
        />
        <Select
          className={css.select}
          options={filteredYearsOptions}
          defaultValue={filteredYearsOptions[yearIndex]}
          styles={styles}
        />
      </div>
    </>
  );
};

export default StatisticsDashboard;
