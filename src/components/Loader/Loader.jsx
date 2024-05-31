import { MutatingDots } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <MutatingDots
      visible={true}
      height='100'
      width='100'
      color='#FED057'
      secondaryColor='#FF868D'
      radius='14.5'
      ariaLabel='mutating-dots-loading'
      wrapperStyle={{}}
      wrapperClass={s.loader}
    />
  );
}
