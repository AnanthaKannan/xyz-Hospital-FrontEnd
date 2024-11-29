import PropTypes from "prop-types";

const Ha = ({ text, className = "" }: { text: string; className?: string }) => (
  <h3 className={className}>{text}</h3>
);

Ha.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Ha.defaultProps = {
  className: "",
};

export default Ha;
