import { forwardRef } from "react";
import { Icon } from "../../images/Icon/Icon";
// import s from "./CustomInput.Calendar.module.css";
// import s from "./CustomInput.Calendar.module.css";
import s from "./CustomInput.module.css";
const CustomInputCalendar = forwardRef(({ value, onClick }, ref) => {
  return (
    <button className={s.customInput} onClick={onClick} ref={ref}>
      {value}
      <Icon
        id="icon-calendar"
        width="24"
        height="24"
        className={s.calendarIcon}
      />
    </button>
  );
});

CustomInputCalendar.displayName = "CustomInputCalendar";

export default CustomInputCalendar;
