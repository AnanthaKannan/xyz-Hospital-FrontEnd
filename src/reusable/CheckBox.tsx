import React from 'react';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox({name, id="", color='primary', label, onChange, checked, keyValue=''}: any) {
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
    )
}
  