import Select from "react-select";
import css from "./StatisticsDashboard.module.css";

const StatisticsDashboard = () => {
  const options = [
    {
      value: "january",
      label: "January",
      color: "#FFC400",
    },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

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
      backgroundColor: "rgba(74, 86, 226, 1)",
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

  return (
    <>
      <div className={css.wrapper}>
        <Select
          className={css.select}
          options={options}
          defaultValue={options[0]}
          styles={styles}
        />
        <Select options={options} defaultValue={options[0]} styles={styles} />
      </div>
    </>
  );
};

export default StatisticsDashboard;
