import { LOGGED_IN } from "./action-types";

export const loggedIn = (data) => {
  const value = localStorage.getItem("loggedIn");

  if (value) {
    return {
      type: LOGGED_IN,
      payload: data,
    };
  }
};
