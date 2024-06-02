import { Icon } from "../../images/Icon/Icon";
import s from "./ButtonAddTransactions.module.css";

export const ButtonAddTransactions = () => {
  return (
    // <div className={s.wrap}>
    <button className={s.btn}>
      <Icon id="icon-plus" width={20} height={20} className={s.icon} />
    </button>
    // </div>
  );
};
