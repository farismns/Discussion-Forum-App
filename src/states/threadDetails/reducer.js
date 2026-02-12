import { SET_THREADS, SET_LOADING } from './action';

const initialState = {
  list: [],
  loading: false,
};

export default function threadsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_THREADS:
      return {
        ...state,
        list: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
