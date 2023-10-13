import PropTypes from 'prop-types';

import Ha from './Ha';

const LoginBackground = ({ children, title }) => (
  <div className="bg-image container-fluid">
    <div>
      <div className="row no-flip login-height">
        <div className="col-md-6" />
        <div className="col-md-1" />
        <div className="col-md-3 d-flex align-items-center">
          <div className="border shadow p-5 rounded border border-light">
            <Ha text={title} className="text-center" />
            { children }
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  </div>
);

LoginBackground.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a required node (any valid JSX
  title: PropTypes.string.isRequired, // Ensure title is a required string prop
};

export default LoginBackground;
