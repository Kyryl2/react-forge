import { Icon } from "../../images/Icon/Icon";

import s from "./ButtonAddTransactions.module.css";

export const ButtonAddTransactions = ({ onClick }) => {
  return (
    <button className={s.btn} onClick={onClick} aria-label="add button">
      <Icon id="icon-plus" width={20} height={20} className={s.icon} />
    </button>
  );
};
