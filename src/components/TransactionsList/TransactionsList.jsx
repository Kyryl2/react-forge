
import { useDispatch, useSelector } from 'react-redux';
import TransactionsItem from '../TransactionsItem/TransactionsItem';
import { selectTransactions } from '../../redux/transactions/selectors';
import { useEffect } from 'react';
import { getTransactionsThunk } from '../../redux/transactions/operations';

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsThunk());
  }, [dispatch]);

  return (
    <>
      {' '}
      {!transactions && <p>You don`t have transaction now...</p>}
      <table>
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Comment </th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <TransactionsItem key={transaction.id} {...transaction} />
          ))}
        </tbody>
      </table>
    </>
  );

};

export default TransactionsList;
