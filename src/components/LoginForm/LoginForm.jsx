import { Form, Formik } from "formik";
import s from "./LoginForm.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { userLoginThunk } from "../../redux/auth/operations";
import { Link } from "react-router-dom";
import { Icon } from "../../images/Icon/Icon";
import toast, { Toaster } from "react-hot-toast";
import { CustomInput } from "./CustomInput";
import Logo from "../Logo/Logo";

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
          icon: "❌",
          position: "top-right",
          style: {
            backgroundImage:
              "linear-gradient(167deg, #ffc727 0%, #9e40ba 61.46%, #7000ff 90.54%)",
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
          <div style={{ marginBottom: 52 }}>
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
                placeholder="password"
                iconID="icon-lock"
              />

              <div className={s.buttonsWrapper}>
                <button className={s.btnLogin} type="submit">
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
