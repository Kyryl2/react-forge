import Currency from "../Currency/Currency";
import s from "./CurrencyTab.module.css";

const CurrencyTab = () => {
  return (
    <div className={s.wrapper}>
      <Currency />
    </div>
  );
};

export default CurrencyTab;
