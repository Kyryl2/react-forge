import s from "./Balance.module.css";
import { useSelector } from "react-redux";
import { selectUserBalance } from "../../redux/auth/selectors";

const Balance = () => {
  const userBalance = useSelector(selectUserBalance);

  // const formattedBalance = userBalance.toLocaleString("en-US", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });
  const formattedBalance = userBalance.toFixed(2).replace(/,/g, "");
  return (
    <div className={s.balanceContainer}>
      <p className={s.balanceTitle}>YOUR BALANCE</p>
      <p className={s.balanceAmount}>
        <span className={s.balanceAmount1}>₴</span> {formattedBalance}
      </p>
    </div>
  );
};

export default Balance;
