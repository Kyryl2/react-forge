import * as Yup from "yup";
import { useDispatch } from "react-redux";
import s from "./RegistrationForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId, useState } from "react";
import { userRegisterThunk } from "../../redux/auth/operations";
import { Icon } from "../../images/Icon/Icon";
import { Link } from "react-router-dom";
import clsx from "clsx";
import PasswordStrengthBar from "react-password-strength-bar";

import Logo from "../Logo/Logo";


const RegistrationForm = () => {
  const dispatch = useDispatch();
  const usernameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const confirmPassField = useId();
  const [password, setPassword] = useState("");

  const styles = {
    // wrap: {
    //   width: 300,
    // },
    // input: {
    //   display: "block",
    //   width: "100%",
    //   height: 38,
    //   padding: "6px 10px",
    //   borderRadius: 2,
    //   border: "solid 1px #ccc",
    //   boxShadow: "inset 0 1px 1px rgba(0,0,0,.1)",
    //   fontSize: 16,
    //   outline: "0",
    //   boxSizing: "border-box",
    // },
  };

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

//   const [inputValue, setInputValue] = useState("");

  const handleSubmit = (values, actions) => {
    const { username, email, password } = values;
    dispatch(userRegisterThunk({ username, email, password }))
      .unwrap()
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
          <div style={{ marginBottom: 40 }}>
            <Logo className={s.title} width={36} height={36} />
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            {({ values }) => (
              <Form className={s.form}>
                <div className={s.wrapContent}>
                  <div className={s.wrap}>
                    <label htmlFor={passwordFieldId}></label>
                    <Icon id="icon-user" width={24} height={24} />
                    <Field
                      style={styles.input}
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
                      style={styles.input}
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
                      style={styles.input}
                      className={s.input}
                      type="password"
                      name="password"
                      id={passwordFieldId}
                      placeholder="Password"
                      value={values.password}
                      onChange={(e) => {
                        values.password = e.target.value;
                        setPassword(e.target.value);
                      }}
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
                      style={styles.input}
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

                <PasswordStrengthBar
                  password={password}
                  minLength={5}
                  onChangeScore={(score, feedback) => {
                    console.log(score, feedback);
                  }}
                />
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
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
