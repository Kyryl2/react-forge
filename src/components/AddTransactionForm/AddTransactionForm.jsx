import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
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
  const [transactionType, setTransactionType] = useState(true);
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

    if (!amount || (!transactionType && !selectedCategory)) {
      toast.error("Validation error: Amount and category are required.");
      setSubmitting(false);
      return;
    }

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
        console.error(
          "Failed to add transaction:",
          error.response?.data || error.message
        );
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    startDate: Yup.date().required("Date is required"),
    selectedCategory: Yup.object().nullable(),
    comment: Yup.string().required("Amount is required"),
  });

  return (
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
      <Toggle onChange={setTransactionType} />
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
          <Form className={s.form}>
            <div className={s.inputContainer}>
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
                <ErrorMessage
                  name="amount"
                  component="div"
                  className={s.errorMessage}
                />

                <div>
                  <ReactDatePicker
                    selected={values.startDate}
                    onChange={(date) => setFieldValue("startDate", date)}
                    dateFormat="dd.MM.yyyy"
                    className={s.dateInput}
                    customInput={<CustomInputCalendar />}
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className={s.errorMessage}
                  />
                </div>
              </div>
              <Field
                type="text"
                name="comment"
                placeholder="Comment"
                className={s.commentInput}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={s.errorMessage}
              />
            </div>
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
  );
};

export default AddTransactionForm;
