import s from "./LogoutModal.module.css";
import { useDispatch } from "react-redux";

import { userLogoutThunk } from "../../redux/auth/operations";
import useMedia from "../../hooks/useMedia";

import Logo from "../Logo/Logo";
import Modal from "../Modal/Modal";

const LogOutModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { isTablet } = useMedia();

  return (
    <Modal closeModal={closeModal}>
      {isTablet && <Logo className={s.title} width={36} height={36} />}

      <p className={s.p}>Are you sure you want to log out?</p>
      <div className={s.buttonsWrapper}>
        <button
          className={s.btnLogout}
          onClick={() => dispatch(userLogoutThunk())}
          aria-label="logout button"
        >
          LOGOUT
        </button>
      </div>
    </Modal>
  );
};

export default LogOutModal;
