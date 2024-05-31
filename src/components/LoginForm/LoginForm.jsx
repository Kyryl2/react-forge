import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./LoginForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { userLoginThunk } from "../../redux/auth/operations";

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const FeedbackSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email!"),
    password: Yup.string()
      .min(8, "Minimum 8 characters!")
      .max(20, "The maximum 20 characters!"),
    //   .required("Required"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(userLoginThunk(values));
    //   .then(() => actions.resetForm())
    //   .catch((error) => error);
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        {/* <img src={favicon} alt="logo" /> */}
        <h2 className={s.title}>Money Guard</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form className={s.form}>
            <div className={s.wrap}>
              <label htmlFor={emailFieldId}></label>
              <svg width="21" height="26">
                <use href="../../images/icons.svg#icon-email" />
              </svg>
              <Field
                className={s.input}
                type="email"
                name="email"
                id={emailFieldId}
                placeholder="E-mail"
              />
              <ErrorMessage className={s.error} component="span" name="email" />
            </div>
            <div className={s.wrap}>
              <label htmlFor={passwordFieldId}></label>
              <Field
                className={s.input}
                type="text"
                name="password"
                id={passwordFieldId}
                placeholder="Password"
              />
              <ErrorMessage
                className={s.error}
                name="password"
                component="span"
              />
            </div>
            {/* <div className={s.login}>
                <p>If you do not have an account yet, you can register! </p>
                <NavLink className={s.link} to="/register">
                  Register
                </NavLink>
              </div> */}
            <button className={clsx(s.btn, s.btnLogin)} type="submit">
              Log in
            </button>
            <button className={clsx(s.btn, s.btnRegister)} type="submit">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
