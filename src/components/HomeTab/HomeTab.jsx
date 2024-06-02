import s from "./HomeTab.module.css";

import TransactionsList from "../TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../ButtonAddTransactions/ButtonAddTransactions";
import Balance from "../Balance/Balance";
import useMedia from "../../hooks/useMedia";

export default function HomeTab() {
  const { isMobile } = useMedia();

  return (
    <div className={s.tab}>
      {isMobile && <Balance />}
      <TransactionsList />
      <ButtonAddTransactions className={s.fixedButton} />
    </div>
  );
}
