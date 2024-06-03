import Icons from "../icons.svg";

export const Icon = ({ id, className, width, height }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`${Icons}#${id}`} />
    </svg>
  );
};
