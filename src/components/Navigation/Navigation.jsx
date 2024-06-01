import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { Icon } from "../../images/Icon/Icon";
import useMedia from "../../hooks/useMedia";

const Navigation = () => {
  const { isMobile } = useMedia();

  const getClasses = ({ isActive }) =>
    [s.navLink, isActive ? s.active : ""].join(" ");

  const navLinks = [
    {
      title: "Home",
      path: "/",
      icon: "icon-home",
      visible: true,
    },
    {
      title: "Statistics",
      path: "/statistics",
      icon: "icon-timeline",
      visible: true,
    },
    {
      title: "Currency",
      path: "/currency",
      icon: "icon-dollar",
      visible: isMobile,
    },
  ];

  return (
    <nav className={s.navigation}>
      {navLinks
        .filter((link) => link.visible)
        .map((link) => (
          <NavLink key={link.title} to={link.path} className={getClasses}>
            <div>
              <Icon id={link.icon} className={s.navIcon} />
              <p className={isMobile ? s.hidden : s.linkText}>{link.title}</p>
            </div>
          </NavLink>
        ))}
    </nav>
  );
};

export default Navigation;
