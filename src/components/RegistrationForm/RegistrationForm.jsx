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
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const confirmPassField = useId();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Must be a valid email.").required("Required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters.")
      .max(20, "Maximum 20 characters.")
      .required("Required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match.")
      .required("Required"),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(userRegisterThunk(values))
      .then(() => actions.resetForm())
      .catch((error) => error);
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
                  <label htmlFor={passwordFieldId}></label>
                  <Icon id="icon-user" width={24} height={24} />
                  <Field
                    className={s.input}
                    type="text"
                    name="name"
                    id={nameFieldId}
                    placeholder="Name"
                  />
                  <ErrorMessage
                    className={s.error}
                    component="span"
                    name="name"
                  />
                </div>
              </div>
              <div className={s.wrapContent}>
                <div className={s.wrap}>
                  <label htmlFor={passwordFieldId}></label>
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
              <div className={s.wrapContent}>
                <div className={s.wrap}>
                  <label htmlFor={passwordFieldId}></label>
                  <Icon id="icon-lock" width={24} height={24} />
                  <Field
                    className={s.input}
                    type="text"
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
                  <button className={clsx(s.btn, s.btnLogin)} type="submit">
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
