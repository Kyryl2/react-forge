import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { Chart } from "../Chart/Chart";
import { getSummaryThunk } from "../../redux/transactions/operations";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../StatisticsTable/StatisticsTable";
import css from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const date = new Date();
    const month = +format(date, "MM");
    const year = +format(date, "yyyy");

    dispatch(getSummaryThunk({ month, year }));
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <Chart />
      <div>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsTab;
