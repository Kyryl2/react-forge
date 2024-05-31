import React from "react";
import s from "./Header.module.css";
import "../../styles/container.css";

import favicon from "../../images/faviсon.png";
import { useDispatch } from "react-redux";
import { userLogoutThunk } from "../../redux/auth/operations";
import { Icon } from "../../images/Icon/Icon";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(userLogoutThunk());
  };
  return (
    <header className="container">
      <div className={s.header}>
        <div className={s.logo}>
          <Icon id="icon-logo" width="25" height="23" />
          <div className={s.logoName}>Money Guard</div>
        </div>
        <div className={s.userInfo}>
          <div className={s.userName}>Name</div>
          <button className={s.exitButton} onClick={handleExit}>
            {/* <span className={s.exitIcon}>⬅</span> */}
            <svg className={s.exitIcon}>
              <use href="../../images/icons.svg#icon-home" />
              <Icon id="icon-close" />
            </svg>
            <span className={s.exitText}>Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
