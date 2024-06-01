import { Outlet } from "react-router-dom";
import Balance from "../../components/Balance/Balance";
import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

import s from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={s.pageContainer}>
      <Header />
      <div className={s.customContainer}>
        <div className={s.boxesContainer}>
          <div className={s.boxLeft}>
            <div className={s.navbalcur}>
              <div className={s.navbal}>
                <Navigation />
                <Balance />
              </div>
              <CurrencyTab />
            </div>
          </div>
          <div className={s.boxRight}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
