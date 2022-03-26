import Container from '../reusable/Container';
import React from 'react'
import CreatePatientComp from '../component/CreatePatientComp';

const CreatePatient = () => {
  return (
    <Container title='Create Patient'>
      <CreatePatientComp />
    </Container>
  )
}

export default CreatePatient;