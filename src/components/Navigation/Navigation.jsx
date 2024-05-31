import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { Icon } from "../../images/Icon/Icon";

const Navigation = () => {
  const getClasses = (isActive) =>
    isActive ? `${s.navLink} ${s.active}` : `${s.navLink}`;
  return (
    <nav className={s.navigation}>
      <NavLink to='' className={({ isActive }) => getClasses(isActive)}>
        <div className={s.linkIcon}>
          <Icon id='icon-home'  className={s.homeIcon} />
        </div>
        <span className={s.linkText}>Home</span>
      </NavLink>

      <NavLink
        to='statistics'
        className={({ isActive }) => getClasses(isActive)}
      >
        <div className={s.linkIcon}>
          <Icon id='icon-timeline'    className={s.timeLineIcon} />
        </div>
        <span className={s.linkText}>Statistics</span>
      </NavLink>

      <NavLink
        to='currency'
        className={({ isActive }) =>
          isActive
            ? `${s.navLink} ${s.active}`
            : `${s.navLink} ${s.currencyLink}`
        }
      >
        <div className={s.linkIcon}>
          <Icon id='icon-dollar'   className={s.dollarIcon} />
        </div>
        <span className={s.linkText}>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
