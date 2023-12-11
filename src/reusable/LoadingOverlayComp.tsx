import React from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

const Container = ({ children, loading=false }) => {
  return (
        <LoadingOverlay
          active={loading}
          spinner
          text="Loading..."
        >
            {children}
        </LoadingOverlay>
  );
};

export default Container;
