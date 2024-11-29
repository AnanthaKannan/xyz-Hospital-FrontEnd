import PropTypes from "prop-types";

const WightCard = ({ text, number }) => (
  <div>
    <div className="d-flex justify-content-between bg-white p-3 rounded shadow m-3">
      <h5 className="text-muted">{text}</h5>
      <h5 className="text-muted">{number}</h5>
    </div>
  </div>
);

WightCard.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default WightCard;
