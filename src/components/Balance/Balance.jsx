import s from "./Balance.module.css";
import { useSelector } from "react-redux";
import { selectUserBalance } from "../../redux/auth/selectors";

const Balance = () => {
  const userBalance = useSelector(selectUserBalance);

  return (
    <div className={s.balanceContainer}>
      <p className={s.balanceTitle}>YOUR BALANCE</p>
      <p className={s.balanceAmount}>
        <span className={s.balanceAmount1}>₴</span> {userBalance}
        {/* {amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} */}
      </p>
    </div>
  );
};

export default Balance;
