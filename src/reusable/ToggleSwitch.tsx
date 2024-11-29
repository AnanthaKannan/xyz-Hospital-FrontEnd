import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";

const ToggleSwitch = ({ checked = false, label = "", onClick }) => (
  <FormGroup>
    <FormControlLabel
      label={label}
      onClick={onClick}
      control={<Switch checked={checked} />}
    />
  </FormGroup>
);

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

// Add defaultProps for non-required props
ToggleSwitch.defaultProps = {
  checked: false,
  label: "",
  onClick: PropTypes.func,
};

export default ToggleSwitch;
