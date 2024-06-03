import css from "./Chart.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { selectSummary } from "../../redux/transactions/selectors";
import { getCategoriesThunk } from "../../redux/transactions/operations";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const { categoriesSummary, periodTotal } = useSelector(selectSummary);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const getCategoryColor = (categoryName) => {
    switch (categoryName) {
      case "Main expenses":
        return "#fed057";
      case "Products":
        return "#ffd8d0";
      case "Car":
        return "#fd9498";
      case "Self care":
        return "#c5baff";
      case "Child care":
        return "#6e78e8";
      case "Household products":
        return "#4a56e2";
      case "Education":
        return "#81e1ff";
      case "Leisure":
        return "#24cca7";
      case "Other expenses":
        return "#00ad84";
      case "Entertainment":
        return "#ffbf00";
      case "Income":
        return "#00c853";
      default:
        return "#ffffff";
    }
  };

  const categoriesTotal = categoriesSummary?.map((category) => category.total);
  const categoryColors = categoriesSummary?.map((category) =>
    getCategoryColor(category.name)
  );

  const data = {
    datasets: [
      {
        data: categoriesTotal,
        backgroundColor: categoryColors,
        borderColor: "transparent",
        cutout: "70%",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = categoriesSummary[context.dataIndex].name;
            const value = context.raw;
            return `${category}: ${value}`;
          },
        },
        displayColors: false,
        backgroundColor: "",
        borderColor: "rgba(0, 0, 0, 0)",
        borderRadius: 5,
        padding: 10,
      },
    },
  };

  return (
    <div className={css.wrapper}>
      <Doughnut data={data} options={options} />
      <span className={css.balance}>&#8372; {periodTotal}</span>
    </div>
  );
};
