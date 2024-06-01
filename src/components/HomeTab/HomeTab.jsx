import s from "./HomeTab.module.css";
import TransactionsList from "../TransactionsList/TransactionsList";

export default function HomeTab() {
  return (
    <div className={s.tab}>
      <TransactionsList />
    </div>
  );
}
