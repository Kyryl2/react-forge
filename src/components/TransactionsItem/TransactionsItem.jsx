import { useDispatch } from 'react-redux';
import { deleteTransactionThunk } from '../../redux/transactions/operations';
import { Icon } from '../../images/Icon/Icon';
import s from './TransactionsItem.module.css';
import useMedia from '../../hooks/useMedia';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};

const TransactionsItem = ({ id, transactionDate, comment, type, amount }) => {
  const dispatch = useDispatch();
  const displayType = type === 'INCOME' ? '+' : '-';
  const { isMobile } = useMedia();

  return (
    <>
      {!isMobile && (
        <tr key={id}>
          <td>{formatDate(transactionDate)}</td>
          <td>{displayType}</td>
          <td>{type}</td>
          <td>{comment}</td>
          <td>{amount}</td>
          <td>
            <div className={s.btncontainer}>
              <button className={s.carandash}>
                <Icon id="icon-pen" height={14} width={14} />
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
      )}
      {isMobile && (
        <li className={s.card} key={id}>
          <div className={s.cardRow}>
            <span className={s.cardLabel}>Date</span>
            <span className={s.cardValue}>{transactionDate}</span>
          </div>
          <div className={s.cardRow}>
            <span className={s.cardLabel}>Type</span>
            <span className={s.c}>{displayType}</span>
          </div>
          <div className={s.cardRow}>
            <span className={s.cardLabel}>Category</span>
            <span className={s.cardValue}>{type}</span>
          </div>
          <div className={s.cardRow}>
            <span className={s.cardLabel}>Comment</span>
            <span className={s.cardValue}>{comment}</span>
          </div>
          <div className={s.cardRow}>
            <span className={s.cardLabel}>Sum</span>
            <span className={s.cardValue}>{amount}</span>
          </div>
          <div className={s.cardActions}>
            <button
              className={s.button}
              type="button"
              onClick={() => dispatch(deleteTransactionThunk(id))}
            >
              Delete
            </button>
            <button className={s.penContainer}>
              <Icon id="icon-pen" height={14} width={14} />
              <p className={s.carandash}>Edit</p>
            </button>
          </div>
        </li>
      )}
    </>
  );
};

export default TransactionsItem;
