import React from "react";
import s from "./Balance.module.css";

const Balance = ({ amount }) => {
  return (
    <div className={s.balanceContainer}>
      <p className={s.balanceTitle}>YOUR BALANCE</p>
      <p className={s.balanceAmount}>
        €33333{" "}
        {/* {amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} */}
      </p>
    </div>
  );
};

export default Balance;
