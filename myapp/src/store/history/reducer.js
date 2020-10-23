import { GET_HISTORY_ASYNC } from "./action-types";

const initialState = {
  result: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_HISTORY_ASYNC:
      return { ...state, ...payload };

    default:
      return state;
  }
};
