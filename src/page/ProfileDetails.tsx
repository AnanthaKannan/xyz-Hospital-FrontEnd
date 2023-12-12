import React from 'react';
import SignUpComp from '../CognitoComp/SignUpForm';
import Container from '../reusable/Container';
import Hb from '../reusable/Hb'

const ProfileDetails = () => (
  <Container title="Profile">
    <Hb text="Profile" />
    <div className='row'>
      <div className='col-md-6'>
        <SignUpComp isSignUp={false} />
      </div>
    </div>
  </Container>
);

export default ProfileDetails;
