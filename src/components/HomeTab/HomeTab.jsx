import TransactionsList from '../TransactionsList/TransactionsList';
import s from './HomeTab.module.css';

export default function HomeTab() {
  return (
    <div className={s.tab}>
      <TransactionsList />
    </div>
  );
}
