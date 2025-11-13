import { type FC } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { MuiColor } from "@/type/type";

type CheckBoxProps = {
  name: string;
  id?: string;
  color?: MuiColor;
  label: string;
  onChange: (checked: boolean, name: string) => void;
  checked: boolean;
  keyValue: string;
};

const CheckBox: FC<CheckBoxProps> = ({
  name,
  id = "",
  color = "primary",
  label,
  onChange,
  checked,
  keyValue = "",
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          key={keyValue}
          checked={checked}
          onChange={() => onChange(!checked, name)}
          name={name}
          color={color}
        />
      }
      label={label}
    />
  );
};

export default CheckBox;
