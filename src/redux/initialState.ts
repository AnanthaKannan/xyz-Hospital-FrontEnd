type CUDstateType = {
  error: string,
  success: boolean,
  loading: boolean,
}

type ListStateType = {
  data: any[],
  tc: number,
  error: string,
  loading: boolean,
}

interface FeedBackState {
  refresh: boolean;
  feedBackList: ListStateType;
  addFeedBack: CUDstateType;
  updateFeedback: CUDstateType;
}

interface PatientState {
  refresh: boolean;
  patientList: ListStateType;
  deletePatient: CUDstateType;
  updatePatient: CUDstateType;
  addPatient: CUDstateType;
}

const CUDstate = {
  error: '',
  success: true,
  loading: false,
}

const listSate = {
  data: [],
  tc: 0,
  error: '',
  loading: false,
}

export const feedBackInitialState: FeedBackState = {
  refresh: false,
  feedBackList: listSate,
  addFeedBack: CUDstate,
  updateFeedback: CUDstate,
}

export const patientInitialState: PatientState = {
  refresh: false,
  patientList: listSate,
  deletePatient: CUDstate,
  updatePatient: CUDstate,
  addPatient: CUDstate,
}