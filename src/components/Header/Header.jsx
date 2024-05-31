import React from "react";
import s from "./Header.module.css";
import "../../styles/container.css";

import favicon from "../../images/faviсon.png";

const Header = () => {
  const handleExit = () => {
    console.log("User is logging out...");
  };
  return (
    <header className="container">
      <div className={s.header}>
        <div className={s.logo}>
          <img src={favicon} alt="Money Guard Logo" className={s.logoImage} />
          <div className={s.logoName}>Money Guard</div>
        </div>
        <div className={s.userInfo}>
          <div className={s.userName}>Name</div>
          <button className={s.exitButton} onClick={handleExit}>
            {/* <span className={s.exitIcon}>⬅</span> */}
            <svg className={s.exitIcon}>
              <use href="../../images/icons.svg#icon-home" />
            </svg>
            <span className={s.exitText}>Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
