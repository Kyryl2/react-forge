import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";

import { CustomInput } from "../LoginForm/CustomInput";
import Logo from "../Logo/Logo";
import { Bar } from "./Bar";

import { userRegisterThunk } from "../../redux/auth/operations";

import s from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const FeedbackSchema = Yup.object().shape({
    username: Yup.string()
      .min(1, "Must be at least 1 character")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 12 characters")
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
        toast.error(`${error.message}`, {
          icon: <IoWarningOutline style={{ width: "40px", height: "40px" }} />,
          position: "top-right",
          style: {
            backgroundImage:
              "linear-gradient(133deg,#ffc727 0%,#bf6e93 61.46%,#a54ab2 90.54%)",

            color: "white",
          },
        });
      });
  };

  return (
    <div className={s.mainContainer}>
      <Toaster position="top-right" reverseOrder={false} pauseOnHover />
      <div className={s.formContainer}>
        <div className={s.container}>
          <Logo className={s.title} width={36} height={36} />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            {({ values: { password, confirm } }) => (
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
                {password && <Bar pass={password} confirm={confirm} />}
                <div className={s.buttonsWrapper}>
                  <button
                    className={clsx(s.btn, s.btnRegister)}
                    type="submit"
                    aria-label="register button"
                  >
                    Register
                  </button>
                  <Link to="/login">
                    <button
                      className={clsx(s.btn, s.btnLogin)}
                      type="button"
                      aria-label="login button"
                    >
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
