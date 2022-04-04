import React from 'react';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox({name, color='primary', label, onChange, checked, keyValue=''}: any) {
    return (
    <FormControlLabel
    control={
        <Checkbox
        key={keyValue}
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
  