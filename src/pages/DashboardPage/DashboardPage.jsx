import { Outlet } from "react-router-dom";
import Balance from "../../components/Balance/Balance";
import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
import Header from "../../components/Header/Header";
import HomeTab from "../../components/HomeTab/HomeTab";
import Navigation from "../../components/Navigation/Navigation";

import s from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <div className={s.main}>
          <div className={s.box_left}>
            <Navigation />
            <Balance />
            <CurrencyTab />
          </div>
          <div className={s.box_right}>
            <HomeTab />
            <Outlet/>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
