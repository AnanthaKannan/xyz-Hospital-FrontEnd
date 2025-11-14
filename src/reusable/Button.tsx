import { type FC } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Icons from "@/reusable/Icons";
import { ButtonColor } from "@/type/type";

export type ButtonType = {
  onClick: () => void;
  className?: string;
  isDisable?: boolean;
  id: string;
  text?: string;
  color?: ButtonColor;
};

export const ClickButton: FC<ButtonType> = ({
  onClick,
  className = "",
  id = "",
  isDisable = false,
  text = "click",
  color = "info",
}) => (
  <Button
    className={className}
    id={id}
    onClick={onClick}
    disabled={isDisable}
    variant="contained"
    type="button"
    color={color}
  >
    {text}
  </Button>
);

export type SubmitButtonType = {
  className?: string;
  isDisable?: boolean;
  id?: string;
  text?: string;
  color?: ButtonColor;
};

export const SubmitButton: FC<SubmitButtonType> = ({
  className = "",
  id = "",
  isDisable = false,
  text = "SUBMIT",
  color = "primary",
}) => {
  return (
    <Button
      className={className}
      type="submit"
      id={id}
      disabled={isDisable}
      variant="contained"
      color={color}
    >
      {text}
    </Button>
  );
};

export type LoadingButtonType = {
  onClick: () => void;
  className?: string;
  isDisable?: boolean;
  id: string;
  text?: string;
  color?: ButtonColor;
  loading?: boolean;
};

export const LoadingClickButton: FC<LoadingButtonType> = ({
  onClick,
  className = "",
  id = "",
  isDisable = false,
  text = "click",
  color = "info",
  loading = false,
}) => (
  <LoadingButton
    className={className}
    id={id}
    onClick={onClick}
    disabled={isDisable}
    variant="contained"
    type="button"
    color={color}
    startIcon={<Icons icon="save" />}
    loading={loading}
    loadingPosition="start"
  >
    {text}
  </LoadingButton>
);
