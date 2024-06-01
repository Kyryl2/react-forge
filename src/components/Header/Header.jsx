import s from "./Header.module.css";
import "../../styles/container.css";
import { Icon } from "../../images/Icon/Icon";
import { useSelector } from "react-redux";
import { selectUsername } from "../../redux/auth/selectors";
import { useToggle } from "../../hooks/useToggle";
import LogOutModal from "../LogoutModal/LogoutModal";
import Logo from "../Logo/Logo";
import useMedia from "../../hooks/useMedia";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { openModal, isOpen, closeModal } = useToggle();
  const { isMobile } = useMedia();

  const userName = useSelector(selectUsername);

  return (
    <header className={s.header}>
      {isMobile && (
        <NavLink to="">
          <Logo width={17} height={17} className={s.logo} />
        </NavLink>
      )}
      {!isMobile && (
        <NavLink to="">
          <Logo width={23} height={23} className={s.logo} />
        </NavLink>
      )}
      <div className={s.userExit}>
        <div className={s.userName}>{userName || "Guest"}</div>
        <button className={s.exitWrapper} onClick={openModal}>
          <Icon id="icon-exit" width={18} height={18} />
          {!isMobile && <p className={s.exitText}>Exit</p>}
        </button>
        {isOpen && <LogOutModal closeModal={closeModal} />}
      </div>
    </header>
  );
};

export default Header;
