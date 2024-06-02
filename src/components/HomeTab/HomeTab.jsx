import s from "./HomeTab.module.css";

import TransactionsList from "../TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../ButtonAddTransactions/ButtonAddTransactions";

export default function HomeTab() {
  return (
    <div className={s.tab}>
      <TransactionsList />
      {/* <div className={s.container}> */}
      <ButtonAddTransactions className={s.fixedButton} />
    </div>
    // </div>
  );
}
