import Container from '../reusable/Container';
import React from 'react'
import PatientRecordComp from '../component/PatientRecordComp';

const PatientRecord = () => {
  return (
    <Container title='Patient Record'>
      <PatientRecordComp />
    </Container>
  )
}

export default PatientRecord;