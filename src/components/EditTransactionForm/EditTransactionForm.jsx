import { useFormik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { patchTransactionThunk } from '../../redux/transactions/operations';
import s from './EditTransactionForm.module.css';

const validationSchema = yup.object().shape({
  sum: yup
    .number()
    .required('Sum is required')
    .positive('Sum must be positive'),
  date: yup.date().required('Date is required'),
  comment: yup.string().required('Comment is required'),
});

const EditTransactionForm = ({ transaction, closeModal }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      sum: transaction.amount,
      date: new Date(transaction.transactionDate),
      comment: transaction.comment,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const updatedTransaction = {
          ...transaction,
          amount: values.sum,
          transactionDate: values.date.toISOString(),
          comment: values.comment,
        };
        await dispatch(patchTransactionThunk(updatedTransaction));
        closeModal();
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form className={s.form} onSubmit={formik.handleSubmit}>
      <div className={s.field}>
        <label htmlFor="sum">Sum</label>
        <input id="sum" type="number" {...formik.getFieldProps('sum')} />
        {formik.touched.sum && formik.errors.sum ? (
          <div className={s.error}>{formik.errors.sum}</div>
        ) : null}
      </div>
      <div className={s.field}>
        <label htmlFor="date">Date</label>
        <DatePicker
          selected={formik.values.date}
          onChange={(date) => formik.setFieldValue('date', date)}
        />
        {formik.touched.date && formik.errors.date ? (
          <div className={s.error}>{formik.errors.date}</div>
        ) : null}
      </div>
      <div className={s.field}>
        <label htmlFor="comment">Comment</label>
        <input id="comment" type="text" {...formik.getFieldProps('comment')} />
        {formik.touched.comment && formik.errors.comment ? (
          <div className={s.error}>{formik.errors.comment}</div>
        ) : null}
      </div>
      {formik.errors.submit && (
        <div className={s.error}>{formik.errors.submit}</div>
      )}
      <button type="submit" disabled={formik.isSubmitting}>
        Save
      </button>
    </form>
  );
};

export default EditTransactionForm;
