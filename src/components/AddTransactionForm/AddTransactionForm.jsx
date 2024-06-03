import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "../../images/Icon/Icon";
import Modal from "../Modal/Modal";
import Toggle from "../Toggle/Toggle";
import s from "./AddTransactionForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/transactions/selectors";
import { getCategoriesThunk } from "../../redux/transactions/operations";
import { styles } from "../../options/selectStylesAdd";
import clsx from "clsx";
export const AddTransactionForm = ({ closeModal }) => {
  const [monthSelectIsOpen, setMonthSelectIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState(true);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const handleMenuOpen = (id) => {
    if (id === "monthSelect") setMonthSelectIsOpen(true);
  };

  const handleMenuClose = (id) => {
    if (id === "monthSelect") setMonthSelectIsOpen(false);
  };

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className={s.div}>
      <Modal closeModal={closeModal}>
        <div onClick={closeModal}>
          <Icon
            id="icon-close"
            width={16}
            height={16}
            className={s.iconClose}
          />
        </div>
        <p className={s.title}>Add transaction</p>
        <Toggle onChange={setTransactionType} />
        {!transactionType && (
          <div className={s.select_wrapper}>
            <Select
              className={s.categorySelect}
              options={categoryOptions}
              placeholder="Select category"
              onMenuOpen={() => handleMenuOpen("monthSelect")}
              onMenuClose={() => handleMenuClose("monthSelect")}
              styles={styles}
            />
            <Icon
              id="icon-down-arrow"
              className={clsx(s.icon, {
                [s.is_active]: monthSelectIsOpen,
              })}
              width="20px"
              height="11px"
            />
          </div>
        )}
        <div className={s.inputs}>
          <input type="number" placeholder="0.00" className={s.inputField} />
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd.MM.yyyy"
            className={s.dateInput}
            showIcon
            icon={
              // <svg
              //   xmlns="http://www.w3.org/2000/svg"
              //   width="1em"
              //   height="1em"
              //   viewBox="0 0 48 48"
              // >
              //   <mask id="ipSApplication0">
              //     <g
              //       fill="none"
              //       stroke="#fff"
              //       strokeLinejoin="round"
              //       strokeWidth="4"
              //     >
              //       <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
              //       <path
              //         fill="#fff"
              //         d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
              //       ></path>
              //     </g>
              //   </mask>
              //   <path
              //     fill="currentColor"
              //     d="M0 0h48v48H0z"
              //     mask="url(#ipSApplication0)"
              //   ></path>
              // </svg>
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9.00003H4V11H6V9.00003ZM10 9.00003H8V11H10V9.00003ZM14 9.00003H12V11H14V9.00003ZM16 2.00003H15V3.05176e-05H13V2.00003H5V3.05176e-05H3V2.00003H2C0.89 2.00003 0.00999999 2.90003 0.00999999 4.00003L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4.00003C18 2.90003 17.1 2.00003 16 2.00003ZM16 18H2V7.00003H16V18Z"
                  fill="#734AEF"
                />
              </svg>
            }
          />
        </div>
        <input placeholder="Comment" className={s.commentInput} />
        <button className={s.addButton}>ADD</button>
      </Modal>
    </div>
  );
};
