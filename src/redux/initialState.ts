export interface AppState {
  loading: boolean;
  refresh: boolean;
  feedBackListData: {
    data: any[],
    error: string,
    totalCount: number,
  };
  addFeedBack: {
    error: string,
    success: boolean,
  },
  updateFeedback: {
    error: string,
    success: boolean,
  },
}

export const initialState: AppState = {
  refresh: false,
  feedBackListData: {
    data: [],
    error: '',
    totalCount: 0
  },
  addFeedBack: {
    error: '',
    success: true
  },
  updateFeedback: {
    error: '',
    success: true
  },
  loading: false,
};

