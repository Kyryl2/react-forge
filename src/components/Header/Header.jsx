import React from "react";
import s from "./Header.module.css";
import "../../styles/container.css";

const Header = () => {
  const handleExit = () => {
    console.log("User is logging out...");
  };
  return (
    <header className="container">
      <div className={s.header}>
        <div className={s.logo}>Money Guard</div>
        <div className={s.userInfo}>
          <span className={s.userName}>Name</span>
          <button className={s.exitButton} onClick={handleExit}>
            <span className={s.exitIcon}>⬅</span>
            <span className={s.exitText}>Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
