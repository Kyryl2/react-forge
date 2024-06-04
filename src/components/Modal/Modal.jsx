import { useEffect } from "react";

import useMedia from "../../hooks/useMedia";

import s from "./Modal.module.css";

const Modal = ({ closeModal, children }) => {
  const { isMobile } = useMedia();

  useEffect(() => {
    const addCloseEvent = (event) => {
      event.key === "Escape" && closeModal();
    };
    document.addEventListener("keydown", addCloseEvent);

    return () => {
      document.removeEventListener("keydown", addCloseEvent);
    };
  }, [closeModal]);

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
        {children}
        <button
          className={s.btnCancel}
          type="button"
          onClick={() => closeModal()}
          aria-label="cancel button"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default Modal;
