import { LOGIN_ASYNC } from "./action-types";

const initialState = {
  result: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_ASYNC:
      return { ...state, ...payload };

    default:
      return state;
  }
};
