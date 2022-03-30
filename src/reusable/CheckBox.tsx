import React from 'react';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox({name, color='primary', label, onChange, checked}: any) {
    return (
    <FormControlLabel
    control={
        <Checkbox
        checked={checked}
        onChange={() => onChange(!checked, name)}
        name={name}
        color={color}
        />
    }
    label={label}
    />
    )
}
  