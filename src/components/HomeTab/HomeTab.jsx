import { useState } from "react";

import TransactionsList from "../TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../ButtonAddTransactions/ButtonAddTransactions";
import Balance from "../Balance/Balance";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

import useMedia from "../../hooks/useMedia";

import s from "./HomeTab.module.css";

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
