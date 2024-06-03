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
          />
        </div>
        <input placeholder="Comment" className={s.commentInput} />
        <button className={s.addButton}>ADD</button>
      </Modal>
    </div>
  );
};
