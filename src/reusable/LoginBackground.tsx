import PropTypes from "prop-types";

import Ha from "./Ha";

const LoginBackground = ({ children, title, classNameA='col-md-7', classNameB='col-md-3' }) => (
  <div className="bg-image container-fluid">
    <div className="row no-flip login-height">
       <div className={classNameA} />
      <div className={`${classNameB} d-flex align-items-center`}>
        <div className="border shadow p-5 rounded border border-light">
          <Ha text={title} className="text-center" />
          {children}
        </div>
      </div>
    </div>
  </div>
);

LoginBackground.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a required node (any valid JSX
  title: PropTypes.string.isRequired, // Ensure title is a required string prop
};

export default LoginBackground;
