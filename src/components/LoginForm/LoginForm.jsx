import { Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

import { userLoginThunk } from "../../redux/auth/operations";
import { CustomInput } from "./CustomInput";
import Logo from "../Logo/Logo";

import s from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

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
      .unwrap()
      .then(() => actions.resetForm())
      .catch(() =>
        toast.error("Email or password is not valid", {
          icon: <IoWarningOutline style={{ width: "40px", height: "40px" }} />,
          position: "top-right",
          style: {
            backgroundImage:
              "linear-gradient(133deg,#ffc727 0%,#bf6e93 61.46%,#a54ab2 90.54%)",

            color: "white",
          },
        })
      );
  };

  return (
    <div className={s.mainContainer}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={s.formContainer}>
        <div className={s.container}>
          <div>
            <Logo className={s.title} width={36} height={36} />
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            <Form className={s.form}>
              <CustomInput
                name="email"
                type="email"
                placeholder="E-mail"
                iconID="icon-email"
              />
              <CustomInput
                name="password"
                placeholder="Password"
                iconID="icon-lock"
              />

              <div className={s.buttonsWrapper}>
                <button
                  className={s.btnLogin}
                  type="submit"
                  aria-label="login button"
                >
                  Log in
                </button>
                <Link className={s.btnRegister} to="/register">
                  Register
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
