import React, { useId } from "react";
import s from "./LoginForm.module.css";
import { Icon } from "../../images/Icon/Icon";
import { ErrorMessage, Field } from "formik";
export const CustomInput = ({ iconID, type = "text", name, placeholder }) => {
  const id = useId();
  return (
    <div className={s.wrapContent}>
      <div className={s.wrap}>
        <label htmlFor={id}></label>
        <Icon id={iconID} width={24} height={24} />
        <Field
          className={s.input}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage className={s.error} name={name} component="span" />
    </div>
  );
};
