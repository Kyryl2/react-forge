import { useSelector } from "react-redux";
import { selectSummary } from "../../redux/transactions/selectors";
import { selectIsLoading } from "../../redux/status/selectors";
import Loader from "../Loader/Loader";

const StatisticsTable = () => {
  const isLoading = useSelector(selectIsLoading);

  const { categoriesSummary } = useSelector(selectSummary);
  console.log(categoriesSummary);

  return (
    <>
      {isLoading && <Loader />}
      {categoriesSummary && (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            {categoriesSummary.map((category, index) => (
              <tr key={index}>
                <td>
                  <span className={category.name}></span>
                  {category.name}
                </td>
                <td>{category.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default StatisticsTable;
