import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  const getClasses = (isActive) =>
    isActive ? `${s.navLink} ${s.active}` : `${s.navLink}`;
  return (
    <nav className={s.navigation}>
      <NavLink to="" className={({ isActive }) => getClasses(isActive)}>
        <div className={s.linkIcon}></div>
        <span className={s.linkText}>Home</span>
      </NavLink>

      <NavLink
        to="statistics"
        className={({ isActive }) => getClasses(isActive)}
      >
        <div className={s.linkIcon}></div>
        <span className={s.linkText}>Statistics</span>
      </NavLink>

      <NavLink
        to="currency"
        className={({ isActive }) =>
          isActive
            ? `${s.navLink} ${s.active}`
            : `${s.navLink} ${s.currencyLink}`
        }
      >
        <div className={s.linkIcon}></div>
        <span className={s.linkText}>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;

// const navItems = [
//   { to: "", iconId: "#icon-home", iconClass: s.homeIcon, text: "Home" },
//   { to: "statistics", iconId: "#icon-graphic", iconClass: s.graphicIcon, text: "Statistics" },
//   { to: "currency", iconId: "#icon-dollar", iconClass: s.dollarIcon, text: "Currency", extraClass: s.currencyLink }
// ];

// const Navigation = () => {
//   const getClasses = (isActive, extraClass = "") =>
//     `${s.navLink} ${isActive ? s.active : ""} ${extraClass}`;

//   return (
//     <nav className={s.navigation}>
//       {navItems.map(({ to, iconId, iconClass, text, extraClass = "" }) => (
//         <NavLink
//           key={to}
//           to={to}
//           className={({ isActive }) => getClasses(isActive, extraClass)}
//         >
//           <div className={s.linkIcon}>
//             <Icon id={iconId} className={iconClass} />
//           </div>
//           <span className={s.linkText}>{text}</span>
//         </NavLink>
//       ))}
//     </nav>
//   );
// };

// export default Navigation;
