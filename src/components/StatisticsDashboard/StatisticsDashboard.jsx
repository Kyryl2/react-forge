import clsx from "clsx";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";

import { Icon } from "../../images/Icon/Icon";

import { styles } from "../../options/selectStyles";
import { getSummaryThunk } from "../../redux/transactions/operations";
import { selectTransactions } from "../../redux/transactions/selectors";
import {
  getCurrentDate,
  getNumericMonth,
  getOptions,
  getOptionsIndex,
} from "../../helpers/getDates";

import css from "./StatisticsDashboard.module.css";

const StatisticsDashboard = () => {
  const [monthSelectIsOpen, setMonthSelectIsOpen] = useState(false);
  const [YearSelectIsOpen, setYearSelectIsOpen] = useState(false);

  const transactions = useSelector(selectTransactions);

  const { currentMonth, currentYear } = getCurrentDate();

  const monthRef = useRef(currentMonth);
  const yearhRef = useRef(currentYear);

  const dispatch = useDispatch();

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

  const handleMonthSelectChange = (monthValue) => {
    const month = getNumericMonth(monthValue);

    monthRef.current = month;

    dispatch(getSummaryThunk({ month, year: yearhRef.current }));
  };

  const handleYearSelectChange = (yearValue) => {
    yearhRef.current = yearValue;

    dispatch(getSummaryThunk({ month: monthRef.current, year: yearValue }));
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
            placeholder={"Month"}
            styles={styles}
            onMenuOpen={() => handleMenuOpen("monthSelect")}
            onMenuClose={() => handleMenuClose("monthSelect")}
            onChange={({ value }) => handleMonthSelectChange(value)}
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
            placeholder={"Year"}
            styles={styles}
            onMenuOpen={() => handleMenuOpen("yearSelect")}
            onMenuClose={() => handleMenuClose("yearSelect")}
            onChange={({ value }) => handleYearSelectChange(value)}
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
