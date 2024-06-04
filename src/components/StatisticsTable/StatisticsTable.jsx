import { useSelector } from "react-redux";
import { selectSummary } from "../../redux/transactions/selectors";
import { selectIsLoading } from "../../redux/status/selectors";
import Loader from "../Loader/Loader";
import css from "./StatisticsTable.module.css";
import clsx from "clsx";

const StatisticsTable = () => {
  const isLoading = useSelector(selectIsLoading);

  const { categoriesSummary } = useSelector(selectSummary);

  return (
    <>
      {isLoading && <Loader />}
      {categoriesSummary && (
        <table className={css.table}>
          <thead className={css.table_head}>
            <tr className={css.table_row}>
              <th>Category</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            {categoriesSummary.map((category, index) => (
              <tr key={index} className={css.table_row}>
                <td className={css.table_data}>
                  <span
                    className={clsx(
                      css.label,
                      css[category.name.toLowerCase().replace(" ", "_")]
                    )}
                  ></span>
                  {category.name}
                </td>
                <td className={css.table_data}>{category.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default StatisticsTable;
