import { SERVER_ACTIVE_ASYNC } from "./action-types";

const initialState = {
  result: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SERVER_ACTIVE_ASYNC:
      return { ...state, ...payload };

    default:
      return state;
  }
};
