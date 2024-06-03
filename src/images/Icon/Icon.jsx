import Icons from "../icons.svg";

export const Icon = ({ id, className, width, height, onClick }) => {
  return (
    <svg className={className} width={width} height={height} onClick={onClick}>
      <use href={`${Icons}#${id}`} />
    </svg>
  );
};
