import React from "react";
import s from "./Header.module.css";
// import s from "../../";
const Header = () => {
  const handleExit = () => {
    console.log("User is logging out...");
  };
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.logo}>Money Guard</div>
        <div className={s.userInfo}>
          <span className={s.userName}>Name</span>
          <button className={s.exitButton} onClick={handleExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
