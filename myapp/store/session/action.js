import { LOGGED_IN } from "./action-types";
import { getStorage} from "../../utils/storageService";

export const loggedIn = (data) => {
  const value = getStorage("oauth");
  const parsedStorage = JSON.parse(value);
	const token = parsedStorage.apiToken

  if (token) {
    return {
      type: LOGGED_IN,
      payload: data,
    };
  }
};
