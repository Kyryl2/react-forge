import { useEffect, useState } from "react";
import s from "./Currency.module.css";
import getCurrency from "../../helpers/currencyApi";
import Loader from "../../components/Loader/Loader";
import downloadImage from "../../images/DashboardPage-IMG/currency-dekstop_1x.webp";
const Currency = () => {
  const [currency, setCurrency] = useState(
    () => JSON.parse(localStorage.getItem("currency")) || null
  );
  const [loading, setLoading] = useState(!currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrency();
        setCurrency(data);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!currency) {
      fetchData();
    }
  }, [currency]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.wrapper}>
      <table className={s.contentTable}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USD</td>
            <td>{currency.usd.rateBuy.toFixed(2)}</td>
            <td>{currency.usd.rateSell.toFixed(2)}</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>{currency.eur.rateBuy.toFixed(2)}</td>
            <td>{currency.eur.rateSell.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <img className={s.image} src={downloadImage} alt="stats" />
    </div>
  );
};

export default Currency;
