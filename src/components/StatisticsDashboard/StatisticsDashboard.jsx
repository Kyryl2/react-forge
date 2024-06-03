import Select from "react-select";
import css from "./StatisticsDashboard.module.css";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import { styles } from "../../options/selectStyles";
import { getOptions, getOptionsIndex } from "../../helpers/getDates";

const StatisticsDashboard = () => {
  const transactions = useSelector(selectTransactions);

  const { filteredMonthsOptions, filteredYearsOptions } =
    getOptions(transactions);

  const { monthIndex, yearIndex } = getOptionsIndex(
    filteredMonthsOptions,
    filteredYearsOptions
  );

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
