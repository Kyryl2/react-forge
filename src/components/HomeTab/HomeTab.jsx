import { useState } from "react";
import s from "./HomeTab.module.css";

import TransactionsList from "../TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../ButtonAddTransactions/ButtonAddTransactions";
import Balance from "../Balance/Balance";
import useMedia from "../../hooks/useMedia";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";

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
      {isModalOpen && <ModalAddTransaction closeModal={toggleModal} />}
    </div>
  );
}
