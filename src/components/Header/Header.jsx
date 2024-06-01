import s from "./Header.module.css";
import "../../styles/container.css";
import { Icon } from "../../images/Icon/Icon";
import { useSelector } from "react-redux";
import { selectUsername } from "../../redux/auth/selectors";
import { useToggle } from "../../hooks/useToggle";
import LogOutModal from "../LogoutModal/LogoutModal";
import Logo from "../Logo/Logo";
import useMedia from "../../hooks/useMedia";

const Header = () => {
  const { openModal, isOpen, closeModal } = useToggle();
  const { isMobile } = useMedia();

  const userName = useSelector(selectUsername);

  return (
    <header className={s.header}>
      {isMobile && <Logo width={17} height={17} />}
      {!isMobile && <Logo width={23} height={23} />}
      <div className={s.userExit}>
        <div className={s.userName}>{userName || "Guest"}</div>
        <a className={s.exitWrapper} onClick={openModal}>
          <Icon id="icon-exit" width={18} height={18} />
          {!isMobile && <p className={s.exitText}>Exit</p>}
        </a>
        {isOpen && <LogOutModal closeModal={closeModal} />}
      </div>
    </header>
  );
};

export default Header;
