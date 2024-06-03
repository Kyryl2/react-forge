import { useState } from "react";
import s from "./HomeTab.module.css";

import TransactionsList from "../TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../ButtonAddTransactions/ButtonAddTransactions";
import { AddTransactionForm } from "../AddTransactionForm/AddTransactionForm";
import Balance from "../Balance/Balance";
import useMedia from "../../hooks/useMedia";

export default function HomeTab() {
  const { isMobile } = useMedia();
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <div className={s.tab}>
      {isMobile && <Balance />}
      <TransactionsList />
      <ButtonAddTransactions className={s.fixedButton} />
      <ButtonAddTransactions onClick={toggleModal} className={s.fixedButton} />
      {isModalOpen && <AddTransactionForm closeModal={toggleModal} />}
    </div>
  );
}
