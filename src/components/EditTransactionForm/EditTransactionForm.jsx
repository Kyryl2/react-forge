import { useFormik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { patchTransactionThunk } from '../../redux/transactions/operations';
import s from './EditTransactionForm.module.css';

const validationSchema = yup.object().shape({
  sum: yup.number().required('Sum is required'),
  date: yup.date().required('Date is required'),
  comment: yup.string().required('Comment is required'),
});

const EditTransactionForm = ({ transaction, closeModal }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      sum: Math.abs(transaction.amount),
      date: new Date(transaction.transactionDate),
      comment: transaction.comment,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const updatedTransaction = {
          ...transaction,
          amount:
            transaction.type === 'EXPENSE'
              ? -Math.abs(values.sum)
              : Math.abs(values.sum), // Сумма отрицательная для расходов и положительная для доходов
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
    <>
      <h2>Edit transaction</h2>
      <h3>Income / Exspence</h3>

      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.field}>
          <label htmlFor="sum"></label>
          <input
            className={s.inputData}
            id="sum"
            type="number"
            value={formik.values.sum}
            onChange={(e) => formik.setFieldValue('sum', e.target.value)}
          />
          {formik.touched.sum && formik.errors.sum ? (
            <div className={s.error}>{formik.errors.sum}</div>
          ) : null}
        </div>
        <div className={s.field}>
          <label htmlFor="date"></label>
          <DatePicker
            className={s.inputData}
            selected={formik.values.date}
            onChange={(date) => formik.setFieldValue('date', date)}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className={s.error}>{formik.errors.date}</div>
          ) : null}
        </div>
        <div className={s.field}>
          <label htmlFor="comment"></label>
          <input
            className={s.commentFild}
            id="comment"
            type="text"
            {...formik.getFieldProps('comment')}
          />
          {formik.touched.comment && formik.errors.comment ? (
            <div className={s.error}>{formik.errors.comment}</div>
          ) : null}
        </div>
        {formik.errors.submit && (
          <div className={s.error}>{formik.errors.submit}</div>
        )}
        <button type="submit" disabled={formik.isSubmitting} className={s.save}>
          Save
        </button>
      </form>
    </>
  );
};

export default EditTransactionForm;
