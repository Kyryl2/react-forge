import { useDispatch, useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import { selectTransactions } from "../../redux/transactions/selectors";
import { useEffect } from "react";
import { getTransactionsThunk } from "../../redux/transactions/operations";
import s from "./TransactionsList.module.css";
import useMedia from "../../hooks/useMedia";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const { isMobile } = useMedia();

  useEffect(() => {
    dispatch(getTransactionsThunk());
  }, [dispatch]);

  return (
    <>
      {!transactions && <p>You don’t have any transactions now...</p>}

      {!isMobile && (
        <div className={s.wrapper}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Comment</th>
                <th>Sum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <TransactionsItem key={transaction.id} {...transaction} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isMobile && (
        <div className={s.wrapper}>
          <ul>
            {transactions?.map((transaction) => (
              <TransactionsItem key={transaction.id} {...transaction} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TransactionsList;
