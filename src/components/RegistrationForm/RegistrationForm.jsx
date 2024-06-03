import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import s from "./RegistrationForm.module.css";
import { Form, Formik } from "formik";

import { userRegisterThunk } from "../../redux/auth/operations";

import { Link } from "react-router-dom";
import clsx from "clsx";
import { CustomInput } from "../LoginForm/CustomInput";
import Logo from "../Logo/Logo";
import {
  selectConfirm,
  selectPassword,
} from "../../redux/progressbar/selectors";
import PasswordStrengthBar from "react-password-strength-bar";

import toast, { Toaster } from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  let pass = useSelector(selectPassword);

  const confirm = useSelector(selectConfirm);
  let pasw = "";
  let word = "";
  let wrd = "";
  let color = "";

  if (pass.length < 8 && pass.length > 0) {
    wrd = "Too short";
    color = "red";
  }
  if (pass !== confirm) {
    color = "yellow";
    word = ["Not match"];
  }
  if (pass.length > 7 && confirm.length < 8 && confirm.length > 0) {
    word = ["Not match"];
    wrd = "Not match";
  }

  if (pass !== "" && pass.length > 7 && pass === confirm) {
    pasw = pass;
    word = ["Okay"];
    color = "green";
  }
  if (pass !== "" && pass.length > 7 && pass !== confirm) {
    color = "red";
    wrd = "Not match";
  }
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
        console.error("Registration error:", error);
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
              {pass && (
                <PasswordStrengthBar
                  password={pasw}
                  minLength={2}
                  shortScoreWord={wrd}
                  scoreWords={[word]}
                  barColors={[color]}
                />
              )}
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
