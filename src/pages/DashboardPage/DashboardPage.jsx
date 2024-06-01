// import { Outlet } from "react-router-dom";
// import Balance from "../../components/Balance/Balance";
// import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
// import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";

import s from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={s.pageContainer}>
      <Header />
      {/* <div className="container">
        <div className={s.main}>
          <div className={s.box_left}>
            <Navigation />
            <Balance />
            <CurrencyTab />
          </div>
          <div className={s.box_right}>
            <Outlet />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardPage;
