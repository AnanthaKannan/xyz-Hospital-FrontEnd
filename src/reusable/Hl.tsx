import PropTypes from 'prop-types';

const Hl = ({ text, className = '' }) => (
  <h1 className={className}>{text}</h1>
);

Hl.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Hl.defaultProps = {
  className: '',
};

export default Hl;
