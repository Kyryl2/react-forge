import s from "./LogoutModal.module.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { userLogoutThunk } from "../../redux/auth/operations";
import useMedia from "../../hooks/useMedia";

import Logo from "../Logo/Logo";

const LogOutModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { isMobile, isTablet } = useMedia();

  useEffect(() => {
    const addCloseEvent = (event) => {
      event.key === "Escape" && closeModal();
    };
    document.addEventListener("keydown", addCloseEvent);

    return () => {
      document.removeEventListener("keydown", addCloseEvent);
    };
  });

  const closeOnClickOutside = (event) => {
    event.currentTarget === event.target && closeModal();
  };

  return (
    <div className={s.logOutModal} onClick={closeOnClickOutside}>
      <div className={s.modalContent}>
        {!isMobile && (
          <div
            className={s.modal_close}
            onClick={() => {
              closeModal();
            }}
          />
        )}

        {isTablet && <Logo  className={s.title} width={36} height={36} />}
        <p className={s.p}>Are you sure you want to log out?</p>
        <div className={s.buttonsWrapper}>
          <button
            className={s.btnLogout}
            onClick={() => dispatch(userLogoutThunk())}
          >
            LOGOUT
          </button>
          <button className={s.btnCancel} onClick={() => closeModal()}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
