import { useDispatch } from 'react-redux';
import { deleteTransactionThunk } from '../../redux/transactions/operations';
import { Icon } from '../../images/Icon/Icon';
import s from './TransactionsItem.module.css';

const TransactionsItem = ({ id, transactionDate, comment, type, amount }) => {
  const dispatch = useDispatch();
  const displayType = type === 'INCOME' ? '+' : '-';

  return (
    <>
      <tr key={id}>
        <td>{transactionDate}</td>
        <td>{displayType}</td>
        <td>{type}</td>
        <td>{comment}</td>
        <td>{amount}</td>
        <td>
          <div className={s.btncontainer}>
            <button className={s.carandash}>
              <Icon id="icon-Icon-carandash" height={14} width={14} />
            </button>
            <button
              className={s.button}
              type="button"
              onClick={() => dispatch(deleteTransactionThunk(id))}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TransactionsItem;
