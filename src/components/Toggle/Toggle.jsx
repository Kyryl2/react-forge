import { useState } from "react";

import { Icon } from "../../images/Icon/Icon";

import s from "./Toggle.module.css";

const Toggle = ({ onChange }) => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);

    const newActiveState = !isActive;
    setIsActive(newActiveState);
    onChange(newActiveState);
  };

  return (
    <div className={s.toggleContainer}>
      <span
        className={`${s.toggleLabel} ${isActive ? s.toggleLabelActive : ""}`}
      >
        Income
      </span>
      <div className={s.toggleSwitch} onClick={handleToggle}>
        <div
          className={`${s.toggleCircle} ${
            isActive ? s.toggleCircleActive : ""
          }`}
        >
          {isActive ? (
            <Icon
              className={s.plusToggle}
              id="icon-plus"
              height={20}
              width={20}
            />
          ) : (
            <Icon
              className={s.minusToggle}
              id="icon-minus"
              height={20}
              width={20}
            />
          )}
        </div>
      </div>
      <span
        className={`${s.toggleLabel} ${!isActive ? s.toggleLabelActive : ""}`}
      >
        Expense
      </span>
    </div>
  );
};

export default Toggle;
