import * as Yup from "yup";
import { useDispatch } from "react-redux";
import s from "./RegistrationForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { userRegisterThunk } from "../../redux/auth/operations";
import { Icon } from "../../images/Icon/Icon";
import { Link } from "react-router-dom";
import clsx from "clsx";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const usernameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const confirmPassField = useId();

  const FeedbackSchema = Yup.object().shape({
    username: Yup.string()
      .min(1, "Must be at least 1 character")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .required("Required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  const handleSubmit = (values, actions) => {
    const { username, email, password } = values;
    dispatch(userRegisterThunk({ username, email, password }))
      .then(() => {
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <div className={s.container}>
          <Icon id="icon-logo" width={21} height={26} />
          <h2 className={s.title}>Money Guard</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            <Form className={s.form}>
              <div className={s.wrapContent}>
                <div className={s.wrap}>
                  <label htmlFor={usernameFieldId}></label>
                  <Icon id="icon-user" width={24} height={24} />
                  <Field
                    className={s.input}
                    type="text"
                    name="username"
                    id={usernameFieldId}
                    placeholder="Username"
                  />
                  <ErrorMessage
                    className={s.error}
                    component="span"
                    name="username"
                  />
                </div>
              </div>
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
                  <ErrorMessage
                    className={s.error}
                    component="span"
                    name="email"
                  />
                </div>
              </div>
              <div className={s.wrapContent}>
                <div className={s.wrap}>
                  <label htmlFor={passwordFieldId}></label>
                  <Icon id="icon-lock" width={24} height={24} />
                  <Field
                    className={s.input}
                    type="password"
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
              <div className={s.wrapContent}>
                <div className={s.wrap}>
                  <label htmlFor={confirmPassField}></label>
                  <Icon id="icon-lock" width={24} height={24} />
                  <Field
                    className={s.input}
                    type="password"
                    name="confirm"
                    id={confirmPassField}
                    placeholder="Confirm password"
                  />
                </div>
                <ErrorMessage
                  className={s.error}
                  component="span"
                  name="confirm"
                />
              </div>
              <div className={s.buttonsWrapper}>
                <button className={clsx(s.btn, s.btnRegister)} type="submit">
                  Register
                </button>
                <Link to="/login">
                  <button className={clsx(s.btn, s.btnLogin)} type="button">
                    Log in
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

export default RegistrationForm;
