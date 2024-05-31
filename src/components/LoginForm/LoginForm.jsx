import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./LoginForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { userLoginThunk } from "../../redux/auth/operations";
import { Link } from "react-router-dom";
import { Icon } from "../../images/Icon/Icon";

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const FeedbackSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email!"),
    password: Yup.string()
      .min(8, "Minimum 8 characters!")
      .max(20, "The maximum 20 characters!"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(userLoginThunk(values))
      .then(() => actions.resetForm())
      .catch((error) => error);
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <div className={s.container}>
          <Icon id="icon-logo" className={s.icon} />
          <h2 className={s.title}>Money Guard</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            <Form className={s.form}>
              <div className={s.wrapContent}>
                <div className={s.wrap}>
                  <label htmlFor={emailFieldId}></label>
                  <Icon id="icon-email" width={24} height={24} />
                  <Field
                    className={s.input}
                    type="email"
                    name="email"
                    id={emailFieldId}
                    placeholder="E-mail"
                  />
                </div>
                <ErrorMessage
                  className={s.error}
                  component="span"
                  name="email"
                />
              </div>

              <div className={s.wrapContent}>
                <div className={s.wrap}>
                  <label htmlFor={passwordFieldId}></label>
                  <Icon id="icon-lock" width={24} height={24} />
                  <Field
                    className={s.input}
                    type="text"
                    name="password"
                    id={passwordFieldId}
                    placeholder="Password"
                  />
                </div>
                <ErrorMessage
                  className={s.error}
                  name="password"
                  component="span"
                />
              </div>

              <div className={s.buttonsWrapper}>
                <button className={clsx(s.btn, s.btnLogin)} type="submit">
                  Log in
                </button>
                <Link to="/register">
                  <button className={clsx(s.btn, s.btnRegister)} type="submit">
                    Register
                  </button>
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
