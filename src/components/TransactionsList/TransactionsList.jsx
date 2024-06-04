import { useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import { selectTransactions } from "../../redux/transactions/selectors";

import s from "./TransactionsList.module.css";
import useMedia from "../../hooks/useMedia";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const { isMobile } = useMedia();

  if (!transactions.length) {
    return (
      <div className={s.filler}>
        <p>You don’t have any transactions now...</p>
      </div>
    );
  }

  return (
    <>
      {!isMobile ? (
        <div className={s.wrapper}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th className={s.type}>Type</th>
                <th>Category</th>
                <th>Comment</th>
                <th className={s.sum}>Sum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions
                ?.toSorted(
                  (a, b) =>
                    new Date(b.transactionDate) - new Date(a.transactionDate)
                )
                .map((transaction) => (
                  <TransactionsItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul>
          {transactions
            ?.toSorted(
              (a, b) =>
                new Date(b.transactionDate) - new Date(a.transactionDate)
            )
            .map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
        </ul>
      )}
    </>
  );
};

export default TransactionsList;
