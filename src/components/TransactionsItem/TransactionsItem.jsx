import { useDispatch } from 'react-redux';
import { deleteTransactionThunk } from '../../redux/transactions/operations';

const TransactionsItem = ({
  id,
  transactionDate,
  comment,
  type,
  amount,
  balanceAfter,
}) => {
  const dispatch = useDispatch();
  return (
    <tr key={id}>
      <td>{transactionDate}</td>
      <td>{type}</td>
      <td>{amount}</td>
      <td>{comment}</td>
      <td>{balanceAfter}</td>

      <>
        <button>img</button>
        <button
          type="button"
          onClick={() => dispatch(deleteTransactionThunk(id))}
        >
          Delete
        </button>
      </>
    </tr>
  );
};

export default TransactionsItem;
