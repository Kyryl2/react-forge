import React from "react";
import s from "./Balance.module.css";

const Balance = () => {
  // const amount = useSelector(state => state.user.balance); // возьмем из баланса  состояния Redux

  return (
    <div className={s.balanceContainer}>
      <p className={s.balanceTitle}>YOUR BALANCE</p>
      <p className={s.balanceAmount}>
        <span className={s.balanceAmount1}>₴</span> 33333{" "}
        {/* {amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} */}
      </p>
    </div>
  );
};

export default Balance;
