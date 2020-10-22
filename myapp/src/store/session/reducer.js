import { LOGGED_IN } from "./action-types";

const initialState = {
  oauth: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGGED_IN:
      return { ...state, ...payload };

    default:
      return state;
  }
};
