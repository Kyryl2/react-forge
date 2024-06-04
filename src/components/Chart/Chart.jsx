import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

import { selectSummary } from "../../redux/transactions/selectors";
import { getData, getOptions } from "../../helpers/chartOptions";
import { getCategoryColor } from "../../helpers/getCategoryColor";
import { ShadowPlugin } from "../../helpers/shadowPlugin";
import css from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const { categoriesSummary, periodTotal } = useSelector(selectSummary);

  const categoriesTotal = useMemo(() => {
    return categoriesSummary?.map((category) => {
      return category.total;
    });
  }, [categoriesSummary]);
  const categoryColors = useMemo(() => {
    return categoriesSummary?.map((category) => {
      return getCategoryColor(category.name);
    });
  }, [categoriesSummary]);

  const data = getData(categoriesTotal, categoryColors);
  const options = getOptions(categoriesSummary);

  return (
    <div className={css.wrapper}>
      <Doughnut data={data} options={options} plugins={[ShadowPlugin]} />
      <span className={css.balance}>
        {categoriesSummary?.length > 0
          ? `₴ ${periodTotal?.toFixed(2)}`
          : "There was no transactions in this period..."}
      </span>
    </div>
  );
};
