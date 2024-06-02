import React, { useState } from "react";
import s from "./HomeTab.module.css";

import TransactionsList from "../TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../ButtonAddTransactions/ButtonAddTransactions";
import { AddTransactionForm } from "../AddTransactionForm/AddTransactionForm";

export default function HomeTab() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    console.log("ddddd");
  };
  return (
    <div className={s.tab}>
      <TransactionsList />

      <ButtonAddTransactions onClick={toggleModal} className={s.fixedButton} />
      {isModalOpen && <AddTransactionForm closeModal={toggleModal} />}
    </div>
  );
}
