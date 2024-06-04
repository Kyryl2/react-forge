import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getData, getOptions } from "../../helpers/chartOptions";
import { selectSummary } from "../../redux/transactions/selectors";
import { getCategoryColor } from "../../helpers/getCategoryColor";
import css from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const { categoriesSummary, periodTotal } = useSelector(selectSummary);

  const categoriesTotal = categoriesSummary?.map((category) => {
    return category.total;
  });
  const categoryColors = categoriesSummary?.map((category) => {
    return getCategoryColor(category.name);
  });

  const data = getData(categoriesTotal, categoryColors);
  const options = getOptions(categoriesSummary);

  return (
    <div className={css.wrapper}>
      <Doughnut data={data} options={options} />
      <span className={css.balance}>
        {categoriesSummary?.length > 0
          ? `₴ ${periodTotal} `
          : "No transactions"}
      </span>
    </div>
  );
};
