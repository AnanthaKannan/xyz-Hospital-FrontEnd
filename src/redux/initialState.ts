interface AppState {
  refresh: boolean;
  feedBackList: {
    data: any[],
    tc: number,
    error: string,
    loading: boolean,
  };
  addFeedBack: {
    error: string,
    success: boolean,
    loading: boolean,
  },
  updateFeedback: {
    error: string,
    success: boolean,
    loading: boolean,
  },
}

export const feedBackInitialState: AppState = {
  refresh: false,
  feedBackList: {
    data: [],
    tc: 0,
    error: '',
    loading: false,
  },
  addFeedBack: {
    error: '',
    success: true,
    loading: false,
  },
  updateFeedback: {
    error: '',
    success: true,
    loading: false,
  },
}