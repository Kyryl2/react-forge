import clsx from "clsx";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import css from "./StatisticsDashboard.module.css";
import { Icon } from "../../images/Icon/Icon";
import { styles } from "../../options/selectStyles";
import { selectTransactions } from "../../redux/transactions/selectors";
import { getOptions, getOptionsIndex } from "../../helpers/getDates";

const StatisticsDashboard = () => {
  const [monthSelectIsOpen, setMonthSelectIsOpen] = useState(false);
  const [YearSelectIsOpen, setYearSelectIsOpen] = useState(false);

  const transactions = useSelector(selectTransactions);

  const { filteredMonthsOptions, filteredYearsOptions } = useMemo(() => {
    return getOptions(transactions);
  }, [transactions]);

  const { monthIndex, yearIndex } = useMemo(() => {
    return getOptionsIndex(filteredMonthsOptions, filteredYearsOptions);
  }, [filteredMonthsOptions, filteredYearsOptions]);

  const handleMenuOpen = (id) => {
    switch (id) {
      case "monthSelect":
        {
          setMonthSelectIsOpen(!monthSelectIsOpen);
        }
        break;
      case "yearSelect":
        {
          setYearSelectIsOpen(!YearSelectIsOpen);
        }
        break;
      default:
    }
  };
  const handleMenuClose = (id) => {
    switch (id) {
      case "monthSelect":
        {
          setMonthSelectIsOpen(!monthSelectIsOpen);
        }
        break;
      case "yearSelect":
        {
          setYearSelectIsOpen(!YearSelectIsOpen);
        }
        break;
      default:
    }
  };

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.select_wrapper}>
          <Select
            id="monthSelect"
            className={css.select}
            options={filteredMonthsOptions}
            defaultValue={filteredMonthsOptions[monthIndex]}
            styles={styles}
            onMenuOpen={() => handleMenuOpen("monthSelect")}
            onMenuClose={() => handleMenuClose("monthSelect")}
          />
          <Icon
            id="icon-down-arrow"
            className={clsx(css.icon, {
              [css.is_active]: monthSelectIsOpen,
            })}
            width="20px"
            height="11px"
          />
        </div>
        <div className={css.select_wrapper}>
          <Select
            id="yearSelect"
            className={css.select}
            options={filteredYearsOptions}
            defaultValue={filteredYearsOptions[yearIndex]}
            styles={styles}
            onMenuOpen={() => handleMenuOpen("yearSelect")}
            onMenuClose={() => handleMenuClose("yearSelect")}
          />
          <Icon
            id="icon-down-arrow"
            className={clsx(css.icon, {
              [css.is_active]: YearSelectIsOpen,
            })}
            width="20px"
            height="11px"
          />
        </div>
      </div>
    </>
  );
};

export default StatisticsDashboard;
