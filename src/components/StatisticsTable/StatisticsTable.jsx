import { useSelector } from "react-redux";
import clsx from "clsx";

import Loader from "../Loader/Loader";

import { selectSummary } from "../../redux/transactions/selectors";
import { selectIsLoading } from "../../redux/status/selectors";

import css from "./StatisticsTable.module.css";

const StatisticsTable = () => {
  const isLoading = useSelector(selectIsLoading);

  const { categoriesSummary, incomeSummary, expenseSummary } =
    useSelector(selectSummary);

  return (
    <>
      {isLoading && <Loader />}
      {categoriesSummary?.length === 0 ? (
        <p className={css.blank}>Nothing to show...</p>
      ) : (
        <table className={css.table}>
          <thead className={css.table_head}>
            <tr className={clsx(css.table_row, css[`head`])}>
              <th className={css.table_heading}>Category</th>
              <th className={css.table_heading}>Sum</th>
            </tr>
          </thead>
          <tbody className={css.table_body}>
            {categoriesSummary?.map((category, index) => (
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
                <td className={css.table_data}>{`${category.total.toFixed(
                  2
                )}`}</td>
              </tr>
            ))}
            <tr className={css.bottom_row}>
              <td className={css.bottom_data}>Expenses:</td>
              <td className={css.bottom_data}>
                <span
                  className={css.expenses_summary}
                >{`${expenseSummary?.toFixed(2)}`}</span>
              </td>
            </tr>

            <tr className={css.bottom_row}>
              <td className={css.bottom_data}>Income:</td>
              <td className={css.bottom_data}>
                <span className={css.income_summary}>{`${incomeSummary?.toFixed(
                  2
                )}`}</span>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default StatisticsTable;
