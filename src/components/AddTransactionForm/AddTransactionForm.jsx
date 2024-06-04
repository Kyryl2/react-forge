import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

import CustomInputCalendar from "./CustomInputCalendar";
import Modal from "../Modal/Modal";
import Toggle from "../Toggle/Toggle";
import { Icon } from "../../images/Icon/Icon";

import { selectCategories } from "../../redux/transactions/selectors";
import { postTransactionThunk } from "../../redux/transactions/operations";
import { styles } from "../../options/selectStylesAdd";
import useMedia from "../../hooks/useMedia";

import s from "./AddTransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";

const AddTransactionForm = ({ closeModal }) => {
  const { isMobile } = useMedia();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [monthSelectIsOpen, setMonthSelectIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(false); // Initialize as false for Expense
  const [defaultIncomeCategory, setDefaultIncomeCategory] = useState(null);

  useEffect(() => {
    if (categories.length > 0) {
      const defaultCategory = categories.find(
        (category) => category.type === "INCOME"
      );
      setDefaultIncomeCategory(defaultCategory ? defaultCategory.id : null);
    }
  }, [categories]);

  const categoryOptions = categories
    .filter(
      (category) => category.type === (transactionType ? "INCOME" : "EXPENSE")
    )
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));

  const handleMenuOpen = (id) => {
    if (id === "monthSelect") setMonthSelectIsOpen(true);
  };

  const handleMenuClose = (id) => {
    if (id === "monthSelect") setMonthSelectIsOpen(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const { amount, comment, startDate, selectedCategory } = values;

    const newTransaction = {
      transactionDate: startDate.toISOString(),
      type: transactionType ? "INCOME" : "EXPENSE",
      categoryId: transactionType
        ? defaultIncomeCategory
        : selectedCategory.value,
      comment,
      amount: transactionType ? parseFloat(amount) : -parseFloat(amount),
    };

    dispatch(postTransactionThunk(newTransaction))
      .unwrap()
      .then(() => closeModal())
      .catch((error) => {
        toast.error(error);
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    startDate: Yup.date().required("Date is required"),
    selectedCategory: Yup.object().nullable(),
    comment: Yup.string().required("Comment is required"),
  });

  return (
    <div>
      <Toaster />
      <Modal closeModal={closeModal}>
        {!isMobile && (
          <div onClick={closeModal}>
            <Icon
              id="icon-close"
              width={16}
              height={16}
              className={s.iconClose}
            />
          </div>
        )}
        <p className={s.title}>Add transaction</p>
        <Toggle onChange={setTransactionType} defaultActive={false} />
        <Formik
          initialValues={{
            startDate: new Date(),
            amount: "",
            comment: "",
            selectedCategory: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className={s.inputContainer}>
              {!transactionType && (
                <div className={s.select_wrapper}>
                  <Select
                    className={s.categorySelect}
                    options={categoryOptions}
                    placeholder="Select a category"
                    onMenuOpen={() => handleMenuOpen("monthSelect")}
                    onMenuClose={() => handleMenuClose("monthSelect")}
                    styles={styles}
                    onChange={(option) =>
                      setFieldValue("selectedCategory", option)
                    }
                  />
                  <Icon
                    id="icon-down-arrow"
                    className={clsx(s.icon, {
                      [s.is_active]: monthSelectIsOpen,
                    })}
                    width="23px"
                    height="18px"
                  />
                </div>
              )}
              <div className={s.inputs}>
                <Field
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  required
                  className={s.inputField}
                />

                <div>
                  <ReactDatePicker
                    selected={values.startDate}
                    onChange={(date) => setFieldValue("startDate", date)}
                    dateFormat="dd.MM.yyyy"
                    className={s.dateInput}
                    maxDate={Date.now()}
                    customInput={<CustomInputCalendar />}
                  />
                </div>
              </div>
              <ErrorMessage name="amount" component="div" className={s.error} />
              <Field
                type="text"
                name="comment"
                placeholder="Comment"
                className={s.commentInput}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={s.error}
              />

              <button
                type="submit"
                className={s.addButton}
                aria-label="add button"
                disabled={isSubmitting}
              >
                ADD
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddTransactionForm;
