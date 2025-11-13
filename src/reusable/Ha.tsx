import { type FC } from "react";

type HaProps = {
  text: string;
  className?: string;
};

const Ha: FC<HaProps> = ({ text, className = "" }) => (
  <h3 className={className}>{text}</h3>
);

export default Ha;
