import { useEffect, useState } from "react";
import s from "./Currency.module.css";
import getCurrency from "../../config/currencyApi";
import Loader from "../../components/Loader/Loader";
import useMedia from "../../hooks/useMedia";
import desktopImage from "../../images/DashboardPage-IMG/currency-dekstop_1x.webp";
import tabletImage from "../../images/DashboardPage-IMG/currency-tablet_1x.webp";
import mobileImage from "../../images/DashboardPage-IMG/currency-mobile_1x.webp";

const Currency = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();
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
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const getImage = () => {
    if (isDesktop) return desktopImage;
    if (isTablet) return tabletImage;
    if (isMobile) return mobileImage;
    return desktopImage;
  };

  return (
    <div className={s.wrapper}>
      <div className={s.headContainer}>
        <p className={s.currency}>Currency</p>
        <p className={s.purchase}>Purchase</p>
        <p className={s.sale}>Sale</p>
      </div>
      <div className={s.valWrapper}>
        <div className={s.valContainer}>
          <p>USD</p>
          <p>{currency.usd.rateBuy.toFixed(2)}</p>
          <p>{currency.usd.rateSell.toFixed(2)}</p>
        </div>
        <div className={s.valContainer}>
          <p>EUR</p>
          <p>{currency.eur.rateBuy.toFixed(2)}</p>
          <p>{currency.eur.rateSell.toFixed(2)}</p>
        </div>
      </div>
      <img className={s.image} src={getImage()} alt="stats" />
    </div>
  );
};

export default Currency;
