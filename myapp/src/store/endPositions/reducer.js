import { GET_END_POSITIONS_ASYNC } from "./action-types";

const initialState = {
  result: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_END_POSITIONS_ASYNC:
      return { ...state, ...payload };

    default:
      return state;
  }
};
