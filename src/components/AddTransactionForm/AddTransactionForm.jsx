import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Icon } from "../../images/Icon/Icon";
import Modal from "../Modal/Modal";
import Toggle from "../Toggle/Toggle";
import s from "./AddTransactionForm.module.css";
import { useEffect, useState } from "react";
import { selectCategories } from "../../redux/transactions/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../../redux/transactions/operations";

export const AddTransactionForm = ({ closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState(true);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <div>
      <Modal closeModal={closeModal}>
        <Icon
          id="icon-close"
          width={16}
          height={16}
          className={s.iconClose}
          onClick={closeModal}
        />
        <p className={s.title}>Add transaction</p>
        {/* <Toggle /> */}
        <Toggle onChange={setTransactionType} />
        {!transactionType && (
          <select className={s.categorySelect}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        <div className={s.inputs}>
          <input type="number" placeholder="0.00" className={s.inputField} />
          {/* <input type="date" className={s.dateInput} /> */}
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <mask id="ipSApplication0">
                  <g
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  >
                    <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                    <path
                      fill="#fff"
                      d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                    ></path>
                  </g>
                </mask>
                <path
                  fill="currentColor"
                  d="M0 0h48v48H0z"
                  mask="url(#ipSApplication0)"
                ></path>
              </svg>
            }
            dateFormat="dd.MM.yyyy"
            className={s.dateInput}
            // icon="fa fa-calendar"
            // calendarClassName={s.datePickerCalendar}
            // wrapperClassName={s.datePickerWrapper}
          />
        </div>
        <input placeholder="Comment" className={s.commentInput} />

        <button className={s.addButton}>ADD</button>
      </Modal>
    </div>
  );
};
