import css from "./Chart.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: [
          8700.0, 3800.74, 1500.0, 800.0, 2208.5, 300.0, 3400.0, 1230.0, 610.0,
        ],
        backgroundColor: [
          "#fed057",
          "#ffd8d0",
          "#fd9498",
          "#c5baff",
          "#6e78e8",
          "#4a56e2",
          "#81e1ff",
          "#24cca7",
          "#00ad84",
        ],
        borderColor: "transparent",
        cutout: "70%",
      },
    ],
  };

  return (
    <div className={css.wrapper}>
      <Doughnut data={data} />
      <span className={css.balance}>&#8372; 24 000.00</span>
    </div>
  );
};
