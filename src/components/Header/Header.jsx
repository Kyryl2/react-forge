import s from "./Header.module.css";
import "../../styles/container.css";
import Icons from "../../images/icons.svg";
// import { useDispatch } from "react-redux";
// import { userLogoutThunk } from "../../redux/auth/operations";
import { Icon } from "../../images/Icon/Icon";
import { useSelector } from "react-redux";
import { selectUsername } from "../../redux/auth/selectors";
import { useToggle } from "../../hooks/useToggle";
import LogOutModal from "../LogoutModal/LogoutModal";

const Header = () => {
  const { openModal, isOpen, closeModal } = useToggle();

  const userName = useSelector(selectUsername);

  return (
    <header className="container">
      <div className={s.header}>
        <div className={s.logo}>
          <Icon id="icon-logo" width="25" height="23" />

          <div className={s.logoName}>Money Guard</div>
        </div>
        <div className={s.userInfo}>
          <div className={s.userName}>{userName || "Guest"}</div>
          <button className={s.exitButton} onClick={openModal}>
            {/* <span className={s.exitIcon}>⬅</span> */}
            <svg className={s.exitIcon}>
              <use href="../../images/icons.svg#icon-home" />
              <Icon id="icon-exit" />
            </svg>
            <span className={s.exitText}>Exit</span>
          </button>
          {isOpen && <LogOutModal closeModal={closeModal} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
