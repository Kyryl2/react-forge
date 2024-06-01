import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { Icon } from "../../images/Icon/Icon";

const Navigation = () => {
  const getClasses = (isActive) =>
    isActive ? `${s.navLink} ${s.active}` : `${s.navLink}`;
  return (
    <nav className={s.navigation}>
      <NavLink to="" className={({ isActive }) => getClasses(isActive)}>
        <div className={s.homeContainer}>
          <Icon id="icon-home" className={s.homeIcon} />
          <p className={s.linkText}>Home</p>
        </div>
      </NavLink>

      <NavLink
        to="statistics"
        className={({ isActive }) => getClasses(isActive)}
      >
        <div className={s.timeLineContainer}>
          <Icon id="icon-timeline" className={s.timeLineIcon} />
          <p className={s.linkText}>Statistics</p>
        </div>
      </NavLink>

      <NavLink
        to="currency"
        className={({ isActive }) =>
          isActive
            ? `${s.navLink} ${s.active}`
            : `${s.navLink} ${s.currencyLink}`
        }
      >
        <div className={s.dollarContainer}>
          <Icon id="icon-dollar" className={s.dollarIcon} />
          <p className={s.linkText}>Currency</p>
        </div>
      </NavLink>
    </nav>
  );
};

export default Navigation;
