import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";

import CustomInputCalendar from "../AddTransactionForm/CustomInputCalendar";
import { Icon } from "../../images/Icon/Icon";
import Modal from "../Modal/Modal";
import toast, { Toaster } from "react-hot-toast";

import useMedia from "../../hooks/useMedia";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/transactions/selectors";
import { patchTransactionThunk } from "../../redux/transactions/operations";

import s from "./EditTransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";

const EditTransactionForm = ({ transaction, closeModal }) => {
  const [startDate, setStartDate] = useState(
    transaction ? new Date(transaction.transactionDate) : new Date()
  );
  const [transactionType] = useState(transaction.type);
  const [defaultIncomeCategory, setDefaultIncomeCategory] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const { isMobile } = useMedia();
  useEffect(() => {
    if (categories.length > 0) {
      const defaultCategory = categories.find(
        (category) => category.type === "INCOME"
      );
      setDefaultIncomeCategory(defaultCategory ? defaultCategory.id : null);
    }
  }, [categories]);

  const categoryName = transaction
    ? categories.find((category) => category.id === transaction.categoryId)
        ?.name
    : "";

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    comment: Yup.string().required("Comment is required"),
    category: Yup.string().when("transactionType", {
      is: "EXPENSE",
      then: (schema) => schema.required("Category is required").nullable(),
    }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const updatedTransaction = {
      id: transaction.id,
      transactionDate: startDate.toISOString(),
      type: transactionType,
      categoryId:
        transactionType === "INCOME"
          ? defaultIncomeCategory
          : transaction.categoryId,
      comment: values.comment,
      amount:
        transactionType === "INCOME"
          ? parseFloat(values.amount)
          : -parseFloat(values.amount),
    };

    if (
      updatedTransaction.categoryId === null &&
      transactionType === "EXPENSE"
    ) {
      setSubmitting(false);
      return;
    }

    dispatch(patchTransactionThunk(updatedTransaction))
      .unwrap()
      .then(() => {
        closeModal();
        setSubmitting(false);
      })
      .catch((error) => {
        toast.error(error);
        setSubmitting(false);
      });
  };

  return (
    <div>
      <Toaster/>
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
        <p className={s.title}>Edit transaction</p>
        <div className={s.toggleContainer}>
          <span className={transactionType === "INCOME" ? s.active : ""}>
            Income
          </span>
          <span className={s.separator}>/</span>
          <span className={transactionType === "EXPENSE" ? s.active : ""}>
            Expense
          </span>
        </div>
        <Formik
          initialValues={{
            amount: transaction ? Math.abs(transaction.amount) : "",
            comment: transaction ? transaction.comment : "",
            category: categoryName,
            transactionType: transactionType,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className={s.form}>
              {transactionType === "EXPENSE" && (
                <Field
                  type="text"
                  name="category"
                  placeholder="Category"
                  className={s.inputField}
                  readOnly
                  value={categoryName}
                />
              )}
              <div className={s.column}>
                <div className={s.inputs}>
                  <Field
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    className={s.inputField}
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className={s.error}
                  />
                  <div>
                    <ReactDatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setFieldValue("transactionDate", date);
                      }}
                      dateFormat="dd.MM.yyyy"
                      className={s.dateInput}
                      customInput={<CustomInputCalendar />}
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
                  className={s.error}
                />
              </div>
              <button type="submit" className={s.save} disabled={isSubmitting}>
                SAVE
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default EditTransactionForm;
