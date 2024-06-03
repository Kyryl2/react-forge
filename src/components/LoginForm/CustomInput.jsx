import { useEffect, useId } from "react";
import s from "./LoginForm.module.css";
import { Icon } from "../../images/Icon/Icon";
import { ErrorMessage, Field, useFormikContext,  } from "formik";
import { useDispatch } from "react-redux";
import { updateConfirm, updateField } from "../../redux/progressbar/slice";



export const CustomInput = ({ iconID, type = "text", name, placeholder} ) => {
  
  const dispatch = useDispatch();
  const { values } = useFormikContext();


  const pass = values.password;

  const  conf = values.confirm;

 
  useEffect(() => {
 dispatch(updateField(pass));
 dispatch(updateConfirm(conf));
  }, [pass,conf,dispatch]);
 
  const id = useId();
  return (
    <div className={s.wrapContent}>
      <div className={s.wrap}>
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
