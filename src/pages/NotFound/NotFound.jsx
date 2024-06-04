import s from "./NotFound.module.css";
import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className={s.bg}>
      <div className={s.wrapper}>
        <div className={s.textWrapper}>
          <h1> Page not found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
        <NavLink className={s.link} to="/">Return back</NavLink>
      </div>
    </div>
  );
};

export default NotFound;
