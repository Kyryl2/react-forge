import s from "./Header.module.css";
import "../../styles/container.css";
import { Icon } from "../../images/Icon/Icon";
import { useSelector } from "react-redux";
import { selectUsername } from "../../redux/auth/selectors";
import { useToggle } from "../../hooks/useToggle";
import LogOutModal from "../LogoutModal/LogoutModal";

import useMedia from "../../hooks/useMedia";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { openModal, isOpen, closeModal } = useToggle();
  const { isMobile } = useMedia();

  const userName = useSelector(selectUsername);

  return (
    <header className={s.headerLine}>
      <div className={s.header}>
        {isMobile && (
          <NavLink to="" className={s.link}>
            <div className={s.div}>
              <Icon id="icon-logo" width={18} height={18} className={s.icon} />
              <p className={s.logoName}>Money Guard</p>
            </div>
          </NavLink>
        )}
        {!isMobile && (
          <NavLink to="">
            <div className={s.div}>
              <Icon id="icon-logo" width={25} height={23} className={s.icon} />
              <p className={s.logoName}>Money Guard</p>
            </div>
          </NavLink>
        )}

        <div className={s.userExit}>
          <div className={s.userName}>{userName || "Guest"}</div>
          <button
            className={s.exitWrapper}
            onClick={openModal}
            aria-label="open modal button"
          >
            <Icon id="icon-exit" width={18} height={18} />
            {!isMobile && <p className={s.exitText}>Exit</p>}
          </button>
          {isOpen && <LogOutModal closeModal={closeModal} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
