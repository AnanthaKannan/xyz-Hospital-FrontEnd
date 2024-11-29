import React from "react";
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckBox({
  name,
  id = "",
  color = "primary",
  label,
  onChange,
  checked,
  keyValue = "",
}: any) {
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
}
