import { Icon } from "../../images/Icon/Icon";
import s from "./Logo.module.css";
const Logo = ({ width, height, className }) => {
  return (
    <div className={s.div}>
      <Icon id="icon-logo" width={width} height={height} />
      <p className={className}>Money Guard</p>
    </div>
  );
};

export default Logo;
