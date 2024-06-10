import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { GrHistory } from "react-icons/gr";

import Chart from "../Chart/Chart";
import StatisticsTable from "../StatisticsTable/StatisticsTable";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";

import { getSummaryThunk } from "../../redux/transactions/operations";
import { selectTransactions } from "../../redux/transactions/selectors";

import css from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    const date = new Date();
    const month = +format(date, "MM");
    const year = +format(date, "yyyy");

    dispatch(getSummaryThunk({ month, year }));
  }, [dispatch]);

  return (
    <>
      {transactions?.length === 0 ? (
        <div className={css.filler}>
          <GrHistory size={45} color={"rgb(251, 251, 251)"} />
          <p className={css.title}>No transactions yet</p>
          <p className={css.description}>
            After your first transaction you will be able to view it here.
          </p>
        </div>
      ) : (
        <div className={css.tab_Container}>
          <h2 className={css.main_title}>Statistics</h2>
          <div className={css.wrapper}>
            <Chart />
            <div>
              <StatisticsDashboard />
              <StatisticsTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticsTab;
