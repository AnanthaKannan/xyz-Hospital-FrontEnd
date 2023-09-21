import React from 'react';
import Fade from '@mui/material/Fade';
// import Grow from '@mui/material/Grow';
const Transitions = ({ children, isChecked }: { children: any, isChecked: boolean }) => {
  if (!isChecked) {
    return (<></>);
  }

  return (
    <Fade
      in={isChecked}
      style={{ transformOrigin: '0 0 0' }}
      {...(isChecked ? { timeout: 1000 } : {})}
    >
      {children}
    </Fade>
  );
};

export default Transitions;
