import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { selectSummary } from "../../redux/transactions/selectors";
import { ShadowPlugin } from "../../options/shadowPlugin";
import { getCategoryColor } from "../../helpers/getCategoryColor";
import { getData, getOptions } from "../../helpers/chartOptions";

import css from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
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
      <span className={css.balance}>{`₴ ${periodTotal?.toFixed(2)}`}</span>
    </div>
  );
};

export default Chart;
