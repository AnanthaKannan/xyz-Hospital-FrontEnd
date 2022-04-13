
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const ToggleSwitch = ({checked=false, label="", onClick}) => {
  return (
    <FormGroup>
    <FormControlLabel label={label} onClick={onClick} control={<Switch checked={checked} />}  />
  </FormGroup>
  )
}

export default ToggleSwitch