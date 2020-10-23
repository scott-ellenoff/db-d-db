import { GET_REALIZED_ASYNC } from "./action-types";

const initialState = {
  result: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_REALIZED_ASYNC:
      return { ...state, ...payload };

    default:
      return state;
  }
};
