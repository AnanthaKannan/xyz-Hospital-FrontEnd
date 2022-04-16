import React from 'react'
import SignUpComp from '../CognitoComp/SignUpForm'
import Container from '../reusable/Container';

const ProfileDetails = () => {
  return (
    <Container title='Profile'>
      <SignUpComp isSignUp={false} />
  </Container>
  )
}

export default ProfileDetails