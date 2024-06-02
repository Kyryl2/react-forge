import * as Yup from "yup";
import { useDispatch } from "react-redux";
import s from "./RegistrationForm.module.css";
import { Form, Formik } from "formik";

import { userRegisterThunk } from "../../redux/auth/operations";
import { Icon } from "../../images/Icon/Icon";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { CustomInput } from "../LoginForm/CustomInput";
import Logo from "../Logo/Logo";

const RegistrationForm = () => {
  const dispatch = useDispatch();

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
            <Form className={s.form}>
              <CustomInput
                name="username"
                type="text"
                placeholder="Username"
                iconID="icon-user"
              />
              <CustomInput
                name="email"
                type="email"
                placeholder="E-mail"
                iconID="icon-email"
              />
              <CustomInput
                name="password"
                type="password"
                placeholder="Password"
                iconID="icon-lock"
              />
              <CustomInput
                name="confirm"
                type="password"
                placeholder="Confirm password"
                iconID="icon-lock"
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
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
